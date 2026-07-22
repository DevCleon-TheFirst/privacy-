import { ethers } from "ethers";

// Ethers ABI for PrivacyTransaction.sol
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

export const CONTRACT_ABI = [
  "function sendTransaction(address _receiver, bytes32 _dataHash) external payable",
  "function getTransactionCount() external view returns (uint256)",
  "event TransactionRecorded(uint256 indexed id, address indexed sender, address indexed receiver, uint256 amount, bytes32 dataHash, uint256 timestamp)"
];

/**
 * Returns a contract instance linked to the user's metaMask signer
 */
export const getContract = async (signer) => {
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}
