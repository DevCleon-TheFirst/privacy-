import { useState } from "react";
import { ethers } from "ethers";
import { useWallet } from "../hooks/useWallet";
import { getContract } from "../utils/contract";
import { hashData } from "../utils/hashData";
import { generateStealthAddress, hashAmount } from "../utils/stealth";
import { saveTransactionOffChain } from "../services/api";

export default function SendTransaction({ onTransactionSuccess }) {
  const { account, signer } = useWallet();
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  const SEPOLIA_CHAIN_ID = 11155111n;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setStatus({ type: "loading", msg: "Validating network..." });

    try {
      // 0. Validate amount is positive
      const parsedAmount = parseFloat(amount);
      if (!parsedAmount || parsedAmount <= 0) {
        setStatus({ type: "error", msg: "Amount must be greater than 0 ETH." });
        setIsProcessing(false);
        return;
      }

      // 1. Network check — must be on Sepolia
      const network = await signer.provider.getNetwork();
      if (network.chainId !== SEPOLIA_CHAIN_ID) {
        setStatus({
          type: "error",
          msg: `Wrong network! You are on chain ID ${network.chainId}. Please switch MetaMask to the Sepolia Testnet (chain ID 11155111).`,
        });
        setIsProcessing(false);
        return;
      }

      // 2. Hash the private note off-chain (runs in browser — never leaves device)
      setStatus({ type: "loading", msg: "Hashing private memo locally..." });
      const dataHash = await hashData(note);

      // 3. Generate a one-time Stealth Address (hides the real receiver on-chain)
      setStatus({ type: "loading", msg: "Generating stealth address for receiver..." });
      const { stealthAddress, ephemeralKey } = await generateStealthAddress(receiver, account);

      // 4. Hash the ETH amount (hides the real value on-chain)
      const amountHash = await hashAmount(amount);

      // 5. Send transaction to Blockchain — stealth address + amount hash, NOT real values
      setStatus({ type: "loading", msg: "Requesting wallet signature..." });
      
      const amountWei = ethers.parseEther(amount);
      const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

      // Encode the new v2 function call with stealthReceiver + amountHash + dataHash
      const abi = ["function sendTransaction(address _stealthReceiver, bytes32 _amountHash, bytes32 _dataHash) external payable"];
      const iface = new ethers.Interface(abi);
      const txData = iface.encodeFunctionData("sendTransaction", [stealthAddress, amountHash, dataHash]);

      const tx = await signer.sendTransaction({
        to: contractAddress,
        data: txData,
        value: amountWei,
        gasLimit: 500000n,
      });

      setStatus({ type: "loading", msg: "Awaiting block confirmation..." });
      const receipt = await tx.wait();

      setStatus({ type: "loading", msg: "Encrypting and saving off-chain..." });

      // 6. Save FULL private details to Laravel API off-chain (real receiver, real amount, real note)
      await saveTransactionOffChain({
        tx_hash:        receipt.hash,
        wallet_address: account,
        receiver:       receiver,        // Real receiver — stored privately off-chain ONLY
        amount:         amount,          // Real amount — stored privately off-chain ONLY
        note:           note,            // Real note — stored privately off-chain ONLY
        data_hash:      dataHash,        // Used for on-chain verification
        stealth_address: stealthAddress, // Stored so receiver can claim funds
        ephemeral_key:   ephemeralKey,   // Stored so receiver can derive stealth private key
      });

      setStatus({ type: "success", msg: "Transaction successfully secured." });
      setReceiver(""); setAmount(""); setNote("");
      if (onTransactionSuccess) onTransactionSuccess();

      setTimeout(() => setStatus({ type: "", msg: "" }), 5000);

    } catch (error) {
      console.error(error);
      const isRejected = error?.message?.includes("rejected") || error?.message?.includes("User denied");
      const isInsufficientFunds = error?.message?.toLowerCase().includes("insufficient funds");

      let msg = `Failed: ${error.message || "Unknown error"}`;
      if (isRejected) msg = "Transaction rejected by user.";
      if (isInsufficientFunds) msg = "Insufficient Sepolia ETH. Get free test ETH from sepoliafaucet.com";

      setStatus({ type: "error", msg });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">

      {/* Network Warning Banner */}
      <div className="p-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 text-yellow-400 text-xs flex items-start gap-2">
        <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span>
          Ensure MetaMask is on the <strong>Sepolia Testnet</strong>. 
          Get free test ETH at{" "}
          <a href="https://sepoliafaucet.com" target="_blank" rel="noreferrer" className="underline">
            sepoliafaucet.com
          </a>
        </span>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Destination Address
        </label>
        <input
          required
          type="text"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          placeholder="0x..."
          disabled={isProcessing}
          className="tesla-input font-mono text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Value (ETH)
        </label>
        <div className="relative">
          <input
            required
            type="number"
            step="0.0001"
            min="0.0001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.001"
            disabled={isProcessing}
            className="tesla-input pr-12 text-lg"
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <span className="text-gray-500 font-medium">ETH</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex justify-between items-center">
          <span>Private Memo</span>
          <span className="text-[10px] text-gray-500 font-normal normal-case flex items-center gap-1">
            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            SHA-256 Hashing Active
          </span>
        </label>
        <textarea
          required
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter transfer details..."
          disabled={isProcessing}
          rows="3"
          className="tesla-input resize-none"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isProcessing}
          className="tesla-button"
        >
          {isProcessing ? (
            <>
              <div className="spinner"></div>
              <span>Processing</span>
            </>
          ) : (
            <>
              Execute Protocol
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>
      </div>

      {status.msg && (
        <div className={`mt-4 p-3 rounded-xl border text-sm animate-fade-in flex items-start gap-2
          ${status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : ''}
          ${status.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : ''}
          ${status.type === 'loading' ? 'bg-white/5 border-white/10 text-gray-300' : ''}
        `}>
          {status.type === 'loading' && <div className="w-2 h-2 mt-1 rounded-full bg-white animate-pulse flex-shrink-0"></div>}
          {status.type === 'success' && (
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
          {status.type === 'error' && (
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          <span>{status.msg}</span>
        </div>
      )}
    </form>
  );
}
