import { useEffect, useState } from "react";
import { useWallet } from "../hooks/useWallet";
import { fetchWalletHistory } from "../services/api";

export default function TransactionHistory() {
  const { account } = useWallet();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (account) {
      loadHistory();
    }
  }, [account]);

  const loadHistory = async () => {
    try {
      const res = await fetchWalletHistory(account);
      if (res.status === 'success') {
        setTransactions(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!account) return null;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
        <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white animate-spin mb-4"></div>
        <p className="text-sm text-gray-500 font-medium tracking-wide w-full text-center">Syncing Local Ledger...</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 animate-fade-in opacity-50 hover:opacity-100 transition-opacity">
          <svg className="w-12 h-12 text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p className="text-sm text-gray-400">Ledger is empty.</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide animate-fade-in">
          {transactions.map((tx) => {
            const isOutgoing = tx.wallet_address.toLowerCase() === account.toLowerCase();
            return (
              <div key={tx.id} className="group flex flex-col p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors relative overflow-hidden">
                {/* Accent status line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${isOutgoing ? 'bg-indigo-500' : 'bg-green-500'} opacity-50`}></div>
                
                <div className="flex justify-between items-start mb-3 pl-2">
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center justify-center w-6 h-6 rounded-md ${isOutgoing ? 'bg-indigo-500/20 text-indigo-400' : 'bg-green-500/20 text-green-400'} shrink-0`}>
                      {isOutgoing ? (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {isOutgoing ? 'Sent To' : 'Received From'}
                      </p>
                      <p className="text-sm text-gray-200 font-mono tracking-tight mt-0.5">
                        {isOutgoing ? `${tx.receiver.slice(0, 8)}...${tx.receiver.slice(-6)}` : `${tx.wallet_address.slice(0, 8)}...${tx.wallet_address.slice(-6)}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-medium tracking-tight ${isOutgoing ? 'text-white' : 'text-green-400'}`}>
                      {isOutgoing ? '-' : '+'}{parseFloat(tx.amount).toString()}
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">{new Date(tx.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="pl-8">
                  {tx.note && (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 inline-block mt-1">
                      <p className="text-sm text-gray-300">"{tx.note}"</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-3 opacity-40 group-hover:opacity-100 transition-opacity">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /></svg>
                    <p className="text-xs text-gray-500 font-mono break-all leading-tight">
                      {tx.data_hash}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
