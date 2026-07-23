import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./hooks/useWallet";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Documentation from "./pages/Documentation";

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';

// Get your own project ID at https://cloud.walletconnect.com
// We're using a generic one for the student project demo
const projectId = 'b2e2f386dbe3f9dfba22558f00db1bb5'; 

// Networks
const sepolia = {
  chainId: 11155111,
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://rpc.sepolia.org'
};

const hardhat = {
  chainId: 31337,
  name: 'Hardhat Local',
  currency: 'ETH',
  explorerUrl: '',
  rpcUrl: 'http://127.0.0.1:8545'
};

const metadata = {
  name: 'PrivacyVault',
  description: 'Privacy-Enhanced Transactions',
  url: 'https://privacy.attz.online', 
  icons: ['https://avatars.mywebsite.com/']
};

const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true,
});

createWeb3Modal({
  ethersConfig,
  chains: [sepolia, hardhat],
  projectId,
  enableAnalytics: false,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#22c55e', // matches green used in UI
  }
});

export default function App() {
  return (
    <BrowserRouter basename="/app">
      <WalletProvider>
        <div className="min-h-screen bg-[#0a0a0b] text-gray-100 font-sans selection:bg-white selection:text-black flex flex-col">
          <Navbar />
          <div className="flex-1 overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/docs" element={<Documentation />} />
            </Routes>
          </div>
        </div>
      </WalletProvider>
    </BrowserRouter>
  );
}
