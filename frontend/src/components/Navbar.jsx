import { Link, useLocation } from "react-router-dom";
import { useWallet } from "../hooks/useWallet";

export default function Navbar() {
  const { account } = useWallet();
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Dashboard" },
    { path: "/docs", label: "Documentation" },
  ];

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
          </svg>
          <span className="text-white font-semibold tracking-wide text-lg drop-shadow-md">PrivacyVault</span>
        </div>

        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Global Connection Status */}
      {account ? (
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full cursor-default hover:bg-white/10 transition-colors">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse-slow"></div>
          <span className="text-sm font-medium tracking-wide font-mono text-gray-200">
            {account.slice(0,6)}...{account.slice(-4)}
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
          <span className="text-sm font-medium tracking-wide text-gray-400">Disconnected</span>
        </div>
      )}
    </nav>
  );
}
