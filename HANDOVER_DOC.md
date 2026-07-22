# Privacy-Enhanced Blockchain Prototype
## Handover & Seminar Documentation

### 1. Introduction and Aim
This document serves as the official handover documentation for the **Privacy-Enhanced Blockchain Prototype**. 
The primary aim of this system is to provide a lightweight, privacy-focused blockchain web application designed specifically for low-resource environments (such as Sub-Saharan Africa). It empowers users to seamlessly and securely send and receive funds without compromising sensitive transaction information.

### 2. The Problem Statement
While blockchain networks (like Ethereum) provide excellent transparency, decentralization, and security, they suffer from two major problems in real-world, localized adoption:
1. **Privacy Concerns:** By default, all data stored on a public blockchain is visible to anyone. If a user attaches sensitive information (like personal notes, payment reasons, or identifiable data) to a transaction, it remains permanently exposed on the public ledger.
2. **High Costs (Gas Fees):** Storing large amounts of data on-chain is incredibly expensive. In low-resource environments, users cannot afford exorbitant transaction fees just to attach small pieces of metadata to their financial transactions.
3. **Resource Constraints:** Heavy, complex decentralized applications (dApps) often require high-end devices and strong internet connections, which can be a barrier in emerging markets.

### 3. The Solution
This prototype resolves the above issues by employing a **hybrid architecture** that separates financial validation from sensitive metadata storage.
- **Client-Side Cryptography:** Before a transaction is sent to the blockchain, any sensitive notes or metadata are hashed locally on the user's device using the native Web Crypto API (SHA-256). 
- **Minimal On-Chain Footprint:** Only the strict financial transaction details (Sender, Receiver, ETH Amount, Timestamp) and the 32-byte cryptographic hash of the note are committed to the Ethereum blockchain. This drastically reduces gas costs.
- **Off-Chain Storage:** The actual plain-text of the sensitive note, along with its hash, is securely transmitted and stored in a traditional, centralized off-chain backend (Laravel API). 
- **Data Integrity:** When retrieving transaction history, the frontend can seamlessly match the on-chain hash with the off-chain plain-text note. If the data is tampered with off-chain, the hashes will not match, preserving the trustless nature of the blockchain while keeping the note private and storage costs low.

### 4. Key Features
- **Secure Web3 Wallet Integration:** Connects directly with MetaMask, ensuring that private keys remain strictly local and are never exposed to the application.
- **Lightweight UI:** Built with React (Vite) and Tailwind CSS to ensure rapid loading times on low-end devices and unstable internet connections.
- **Local Hashing:** Utilizes built-in browser cryptography for fast, zero-dependency hashing of transaction metadata.
- **Cost-Optimized Smart Contracts:** Solidity contracts are optimized to only store the bare minimum required to preserve financial integrity and proof of metadata existence.

### 5. Technology Stack
- **Blockchain Layer:** Solidity (Smart Contracts), Hardhat (Development Environment), Ethers.js (Web3 Library)
- **Frontend Layer:** React 18, Vite (Build Tool), Tailwind CSS (Styling)
- **Backend Layer (Off-Chain):** Laravel 11 (PHP), SQLite/MySQL
- **Cryptography:** Native Browser Web Crypto API

---

### 6. Seminar Demonstration Guide (Setup & Execution)
*Follow these steps to demonstrate the prototype running on a local machine during your seminar.*

**Prerequisites:**
Ensure you have installed: Node.js (v18+), PHP (v8.2+) with Composer, and the MetaMask Browser Extension.

#### Step 1: Start the Local Blockchain (Hardhat)
Open Terminal 1 and run:
```bash
cd blockchain
npm install
HARDHAT_TELEMETRY_OPTOUT=1 npx hardhat node
```
*Note: This starts a local Ethereum node (`http://127.0.0.1:8545`) and generates test accounts pre-loaded with ETH. Leave this terminal running.*

#### Step 2: Deploy the Smart Contract & Start the Backend
Open Terminal 2 and run:
```bash
# Deploy Contract to Local Node
cd blockchain
npx hardhat run scripts/deploy.js --network localhost

# Start Laravel API
cd ../
composer install
php artisan migrate:fresh
php artisan serve
```
*Note: The Laravel API will run at `http://127.0.0.1:8000`. Leave this terminal running.*

#### Step 3: Launch the Frontend Web Interface
Open Terminal 3 and run:
```bash
cd frontend
npm install
npm run dev
```
*Note: Open your browser to `http://localhost:5173/`.*

#### Step 4: The Live Demo Flow
1. **Import Account:** Open MetaMask, switch to the "Localhost 8545" network, and import one of the private keys provided by the Hardhat terminal in Step 1.
2. **Connect Wallet:** Click "Connect MetaMask" on the web interface.
3. **Initiate Transaction:** Fill out the "Send Funds" form. Enter a receiver address, an ETH amount, and a "Private Note".
4. **Explain the Process:** Explain to the audience that when you click "Send", the Private Note is hashed *before* anything is sent to the blockchain.
5. **Confirm & View:** Confirm the transaction in MetaMask. Show the audience the Transaction History panel, explaining how the on-chain data and off-chain private note are seamlessly merged for the authorized user.

### 7. Future Enhancements & Roadmap
- **Zero-Knowledge Proofs (ZKPs):** Integrating ZK-Rollups for even greater privacy and scalability.
- **Mobile Application:** Building a React Native version for wider accessibility in mobile-first markets.
- **Multi-Chain Support:** Expanding support to cheaper EVM-compatible L2 chains (e.g., Polygon, Arbitrum) for production deployment.
