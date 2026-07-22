# Privacy-Enhanced Blockchain Prototype

A lightweight, privacy-focused blockchain web application designed for low-resource environments (e.g., Sub-Saharan Africa). This system enables users to send and receive funds securely while minimizing the exposure of sensitive transaction data through client-side hashing and off-chain storage.

## Features
- **Wallet Access:** Connects securely with MetaMask to handle private keys strictly locally.
- **Privacy Mechanism:** Sensitive transaction notes are hashed locally via the Web Crypto API (SHA-256) before touching the blockchain.
- **Minimal On-Chain Storage:** Only the sender, receiver, ETH amount, timestamp, and the 32-byte hash are stored on the Ethereum network.
- **Off-Chain Storage:** Full transaction details (including the plain-text note) are stored in a private Laravel API backend, reducing expensive blockchain gas costs.
- **Lightweight UI:** Built with React (Vite) and Tailwind CSS for rapid loading on low-end devices.

## Technology Stack
- **Blockchain:** Solidity, Hardhat, Ethers.js
- **Frontend:** React 18, Vite, Tailwind CSS
- **Backend (Off-Chain Data):** Laravel 11, SQLite/MySQL
- **Cryptography:** Native Browser Web Crypto API (SHA-256)

---

## 🚀 Setup & Installation Guide

### Prerequisites
- Node.js (v18+)
- PHP (v8.2+) & Composer
- MetaMask Browser Extension

### 1. Local Blockchain Setup (Hardhat)
Open a terminal and start the local blockchain node:
```bash
cd blockchain
npm install
HARDHAT_TELEMETRY_OPTOUT=1 npx hardhat node
```
This will start a local Ethereum network on `http://127.0.0.1:8545` and provide test accounts with 10,000 ETH. Leave this terminal running.

### 2. Deploy Smart Contract & Start Backend (Laravel)
Open a second terminal to deploy the contract and start the off-chain API:
```bash
# Deploy Contract
cd blockchain
npx hardhat run scripts/deploy.js --network localhost

# Start Laravel API
cd ../
composer install
php artisan migrate:fresh
php artisan serve
```
Leave this terminal running. The API will be available at `http://127.0.0.1:8000`.

### 3. Start the Frontend (React)
Open a third terminal to run the web interface:
```bash
cd frontend
npm install
npm run dev
```
Open your browser to the provided URL (e.g., `http://localhost:5173/`).

---

## 🛠 Usage Instructions
1. Open the Web Interface.
2. Ensure you have imported one of the Hardhat test private keys into your MetaMask.
3. Click "Connect MetaMask". The app will automatically prompt you to switch to the Hardhat Local Network (Chain ID: 31337).
4. Fill in the "Send Funds" form with a receiver address, ETH amount, and a Private Note.
5. Click Send and Confirm in MetaMask. The app will hash your note, submit the transaction to the blockchain, and save the plain-text safely to the Laravel backend.
6. View the transaction seamlessly in the "Transaction History" panel.

---

## License
MIT License
