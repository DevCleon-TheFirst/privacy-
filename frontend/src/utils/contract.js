import { ethers } from "ethers";

// Ethers ABI for PrivacyTransaction.sol
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

export const CONTRACT_ABI = [
  "function sendTransaction(address _stealthReceiver, bytes32 _amountHash, bytes32 _dataHash) external payable",
  "function getTransactionCount() external view returns (uint256)",
  "event TransactionRecorded(uint256 indexed id, address indexed sender, address indexed stealthReceiver, bytes32 amountHash, bytes32 dataHash, uint256 timestamp)"
];

/**
 * Returns a contract instance linked to the user's metaMask signer
 */
export const getContract = async (signer) => {
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}
