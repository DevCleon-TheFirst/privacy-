# 📖 Privacy-Enhanced Blockchain Platform: User Manual

Welcome to the Privacy-Enhanced Blockchain platform. This manual is designed to help you understand how the system works and guide you step-by-step on how to use it. Even if you were not involved in the technical creation of this software, this guide will explain everything you need to know to use it confidently.

---

## 1. Understanding the Platform (In Simple Terms)

When you send money on a normal blockchain (like Ethereum), everything is public. If you write a note like *"Payment for medical supplies"*, the entire world can see it forever. 

This platform solves that problem. It allows you to send cryptocurrency (ETH) to anyone, while keeping your personal notes **100% private**. 

**How it works:**
1. You write your private note.
2. Before the transaction leaves your computer, the system scrambles (hashes) your note into an unrecognizable string of characters.
3. The platform sends the **money** and the **scrambled note** to the public blockchain.
4. It sends your **real, readable note** directly to a secure, private database.
5. When you view your history, the platform securely matches the public blockchain record with your private database record so only *you* and the *receiver* can read it.

---

## 2. Prerequisites: What You Need to Get Started

Before using the platform, you need a digital wallet to hold your funds and interact with the blockchain. We use **MetaMask**.

1. **Install MetaMask:** Go to [metamask.io](https://metamask.io) and install the extension for your browser (Chrome, Firefox, Brave, or Edge).
2. **Create an Account:** Follow the instructions to create a wallet and safely write down your 12-word secret recovery phrase.
3. **Switch to the Correct Network:** Ensure your MetaMask is connected to the network where the platform is deployed (e.g., Ethereum Mainnet, Polygon, or a specific Testnet). If you are running the system locally for a demonstration, switch to `Localhost 8545`.

---

## 3. Step-by-Step Usage Guide

### Step 1: Connecting Your Wallet
1. Open the platform in your web browser.
2. Click the **"Connect MetaMask"** (or "Connect Wallet") button, usually located in the center of the screen or the top right corner.
3. Your MetaMask extension will pop up. Select your account and click **"Next"**, then **"Connect"**.
4. Once connected, your wallet address (e.g., `0x1234...abcd`) and your current ETH balance will be visible on the screen.

### Step 2: Sending Funds with a Private Note
Now that you are connected, you can send funds. Locate the **"Send Funds"** form on the main dashboard.

You will need to fill out three fields:
- **Receiver Address:** The cryptocurrency wallet address of the person you are sending money to (must start with `0x`).
- **ETH Amount:** The amount of cryptocurrency you wish to send (e.g., `0.05`).
- **Private Note:** The sensitive message or payment reason you want to attach (e.g., *"Invoice #1024 - Confidential Consulting"*).

**To send:**
1. Click the **"Send"** button.
2. *Behind the scenes, your browser immediately encrypts (hashes) your Private Note.*
3. MetaMask will pop up asking you to confirm the transaction. This will show the gas fee and the total amount.
4. Click **"Confirm"** in MetaMask.
5. Wait a few moments for the transaction to be processed on the blockchain. You will see a success message once it is complete.

### Step 3: Viewing Your Transaction History
To see your past transactions and read your private notes:
1. Navigate to the **"Transaction History"** panel on the dashboard.
2. Here, you will see a list of all your sent and received transactions.
3. For each transaction, you will see the date, the amount, the receiver, and your **readable Private Note**.
4. The system automatically fetches the secure note from the private database and verifies it against the blockchain, ensuring no one has tampered with your data.

---

## 4. Frequently Asked Questions (FAQ)

**Q: Can anyone else read my private note on the blockchain?**
A: No. If someone looks up your transaction on a public block explorer (like Etherscan), they will only see a scrambled code (a hash). They cannot reverse this code to read your note.

**Q: What happens if the private database goes offline?**
A: Your funds are perfectly safe because the financial transaction happened on the blockchain. However, the readable version of your private note won't be accessible until the database is back online. The scrambled hash remains on the blockchain as proof it existed.

**Q: Are my private keys safe?**
A: Yes. Your private keys never leave the MetaMask extension and are never shared with our platform or our database. We only request permission to propose transactions, which you must manually approve.

**Q: Why do I need to pay "Gas"?**
A: Gas is the transaction fee charged by the blockchain network (not by this platform) to process and validate your transaction. Because our platform minimizes the data sent to the blockchain, your gas fees are kept as low as possible.

---

*If you experience any critical errors, ensure your MetaMask is unlocked, you are on the correct network, and you have enough ETH to cover the transaction amount plus gas fees.*
