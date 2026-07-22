import axios from "axios";

// Connects to the Laravel API running locally
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

/**
 * Save transaction privately in Laravel (Off-Chain)
 */
export async function saveTransactionOffChain(txData) {
    /* 
      txData expects: 
      { tx_hash, wallet_address, receiver, amount, note, data_hash } 
    */
    const response = await api.post("/transactions", txData);
    return response.data;
}

/**
 * Fetch a wallet's full history from Laravel
 */
export async function fetchWalletHistory(walletAddress) {
    const response = await api.get(`/transactions?wallet=${walletAddress}`);
    return response.data;
}
