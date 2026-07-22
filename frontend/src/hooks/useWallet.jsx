import { useState, createContext, useContext, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3ModalProvider, useWeb3ModalAccount, useWeb3Modal } from '@web3modal/ethers/react';

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
    // We rely on Web3Modal to manage connection state internally
    const { address, isConnected } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const { open } = useWeb3Modal();

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    // Watch for connection changes and prepare the typical Ethers Signer
    useEffect(() => {
        if (isConnected && walletProvider) {
            // Re-wrap the walletProvider (from wagmi/web3modal) with Ethers BrowserProvider
            const ethProvider = new ethers.BrowserProvider(walletProvider);
            setProvider(ethProvider);
            ethProvider.getSigner().then((s) => setSigner(s));
        } else {
            setProvider(null);
            setSigner(null);
        }
    }, [isConnected, walletProvider]);

    // Our new connect function just opens the WalletConnect modal!
    const connectWallet = async () => {
        await open();
    };

    return (
        <WalletContext.Provider value={{ 
            account: isConnected ? address : "", 
            balance: "", 
            provider, 
            signer, 
            connectWallet 
        }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);
