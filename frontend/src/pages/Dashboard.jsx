import { useWallet } from "../hooks/useWallet";
import SendTransaction from "../components/SendTransaction";
import TransactionHistory from "../components/TransactionHistory";
import { useState } from "react";

export default function Dashboard() {
  const { account, connectWallet } = useWallet();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="flex flex-col items-center pt-8 px-4 pb-20 w-full">
      <div className="w-full max-w-4xl mt-2">
        {!account ? (
          <div className="text-center py-20 flex flex-col items-center justify-center animate-slide-up glass-panel rounded-3xl p-10 mt-10">
            <svg className="w-16 h-16 text-white mb-6 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
            <h2 className="text-2xl font-medium text-white mb-3">Authentication Required</h2>
            <p className="text-gray-400 mb-8 max-w-sm text-sm">Please connect your authorized Web3 wallet to access the secure transaction terminal.</p>
            <button
              onClick={connectWallet}
              className="tesla-button w-auto px-10 text-base"
            >
              Connect MetaMask
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-slide-up">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-2">
              <div className="glass-panel rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <h3 className="text-xl font-medium text-white mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Execute Transfer
                </h3>
                <SendTransaction onTransactionSuccess={() => setRefreshKey(k => k + 1)} />
              </div>
            </div>

            {/* Right Column: History */}
            <div className="lg:col-span-3">
              <div className="h-full tesla-card p-8 bg-[#111112]">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                  <h3 className="text-xl font-medium text-white">Encrypted Ledger</h3>
                  <span className="text-xs text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">Live Sync</span>
                </div>
                <TransactionHistory key={refreshKey} />
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
