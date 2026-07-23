# 🚀 Step-by-Step Local Setup Guide (For Non-Developers)

Hello! This guide is written specifically for you to get the **Privacy-Enhanced Blockchain Prototype** running on your own computer, even if you do not have any programming experience. 

Please follow these steps carefully, one by one.

---

## Phase 1: Install Required Software (One-time setup)
Before you can run the app, you need to install a few standard tools that developers use. Download and install them in this order:

1. **Git (To download the code):**
   - Go to [git-scm.com/downloads](https://git-scm.com/downloads) and download it for your operating system (Windows/Mac). Run the installer and click "Next" through all the default options.
2. **Node.js (For the frontend and blockchain):**
   - Go to [nodejs.org](https://nodejs.org/) and download the **LTS (Long Term Support)** version. Run the installer and click "Next" through all defaults.
3. **PHP & Composer (For the backend):**
   - **For Windows:** The easiest way is to install **Laragon** (Download the "Laragon Full" version from [laragon.org/download](https://laragon.org/download)). Once installed, open Laragon and click "Start All". This installs PHP automatically. Next, download and install **Composer** from [getcomposer.org/Composer-Setup.exe](https://getcomposer.org/Composer-Setup.exe).
   - **For Mac:** Download and install **Laravel Herd** from [herd.laravel.com](https://herd.laravel.com/). 
     - **Yes, the core version of Herd is completely 100% free.** (You do *not* need "Herd Pro").
     - **Step 1:** Click the "Download for macOS" button on their website.
     - **Step 2:** Open the downloaded `.dmg` file and drag the Herd icon into your Applications folder.
     - **Step 3:** Open Herd from your Applications folder. It will ask for your Mac password to install a few background services.
     - **Step 4:** Once Herd is running, you will see a small "H" icon at the top right of your Mac menu bar. That's it! PHP and Composer are now fully installed and ready to use in your terminal.
4. **Visual Studio Code (To easily run commands):**
   - Go to [code.visualstudio.com](https://code.visualstudio.com/) and install it.

---

## Phase 2: Download the Code
1. Open **Visual Studio Code (VS Code)**.
2. Click on **Terminal** at the very top menu bar, then click **New Terminal**. A small black box will appear at the bottom of the screen.
3. In that terminal box, type the following command and press **Enter**:
   ```bash
   git clone [INSERT_YOUR_GITHUB_REPO_LINK_HERE]
   ```
   *(Replace `[INSERT_YOUR_GITHUB_REPO_LINK_HERE]` with the link provided by your developer).*
4. Once it finishes downloading, go to the top left of VS Code, click **File > Open Folder**, and select the downloaded project folder (usually named `privacy-app`).

---

## Phase 3: Start the Local Blockchain
You will need to open **three separate terminal tabs** in VS Code to run the three parts of the system. Let's start the first one.

1. In VS Code, click **Terminal > New Terminal**.
2. Type the following commands, pressing **Enter** after each line:
   ```bash
   cd blockchain
   npm install
   npx hardhat node
   ```
3. **What happens:** You will see a list of 20 fake "Accounts" and "Private Keys" appear on the screen, along with `Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/`. 
4. **IMPORTANT:** Keep this terminal open! Do not close it.

---

## Phase 4: Start the Backend (Database & Server)
Now we will start the secure database that holds the private notes.

1. Look at your Terminal window in VS Code. On the right side, click the **"+" (plus) icon** to open a **second** terminal tab.
2. Type the following commands, pressing **Enter** after each line:
   ```bash
   composer install
   ```
   *(Wait for it to finish downloading packages).*
3. Next, we need to create a settings file. Type:
   - **On Mac/Linux:** `cp .env.example .env`
   - **On Windows:** `copy .env.example .env`
4. Now, type these final commands, pressing **Enter** after each:
   ```bash
   php artisan key:generate
   php artisan migrate
   ```
   *(If it asks "Would you like to create the database?", type **yes** and press Enter).*
5. Finally, start the server by typing:
   ```bash
   php artisan serve
   ```
6. **What happens:** You should see a message saying `Server running on [http://127.0.0.1:8000]`. 
7. **IMPORTANT:** Keep this second terminal open!

---

## Phase 5: Start the Frontend (The Website)
Now we will start the actual website that you click and interact with.

1. Click the **"+" (plus) icon** in the terminal window again to open a **third** terminal tab.
2. Type the following commands, pressing **Enter** after each line:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. **What happens:** You will see a link appear, usually `http://localhost:5173/`. 
4. **Hold down the CTRL key (or CMD on Mac)** and click that link. It will open the platform in your web browser!

---

## Phase 6: Connect MetaMask and Test It
Your system is now fully running! To test it, you need to connect your wallet.

1. Open your **MetaMask** browser extension.
2. At the top left of MetaMask, click the network dropdown (it usually says "Ethereum Mainnet") and select **"Add network"**.
3. Scroll down and click **"Add a network manually"**. Enter these details:
   - **Network Name:** Localhost 8545
   - **New RPC URL:** `http://127.0.0.1:8545/`
   - **Chain ID:** 31337
   - **Currency Symbol:** ETH
4. Click **Save**, and switch to this new network.
5. **Get test money:** Go back to **Terminal 1** in VS Code (where the blockchain is running). Copy one of the long **Private Keys** listed there.
6. Open MetaMask, click the account dropdown at the top middle, click **"Add account or hardware wallet"**, then **"Import account"**. Paste the private key and click Import. You now have 10,000 test ETH!
7. Go to the website (`http://localhost:5173/`), click **"Connect MetaMask"**, and you can now start sending test transactions with private notes.

---
*Note: To shut everything down when you are finished, just close Visual Studio Code.*
