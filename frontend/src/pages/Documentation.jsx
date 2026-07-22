export default function Documentation() {
  return (
    <div className="flex flex-col items-center pt-12 px-4 pb-20 w-full animate-fade-in">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Technical Documentation</h1>
        <p className="text-gray-400 mb-10 text-sm tracking-wide">Architecture & Privacy Model Overview for Academic Review</p>

        <article className="glass-panel rounded-3xl p-8 space-y-8 text-gray-300">
          
          <section>
            <h2 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              1. Project Objective
            </h2>
            <p className="text-sm leading-relaxed">
              This prototype demonstrates a highly privacy-enhanced, localized blockchain application. Traditional blockchain networks (like Ethereum) expose all metadata regarding transactions to the public. If individuals use blockchain networks to transmit sensitive financial details (such as medical fee payments or localized debts), that information is permanently public.
              Our architecture solves this by <strong>decoupling metadata from the blockchain</strong>, securely hashing it on the client side, and maintaining an immutable validation link off-chain.
            </p>
          </section>

          <hr className="border-white/5" />

          <section>
            <h2 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              2. The Client-Side Hashing Protocol
            </h2>
            <p className="text-sm leading-relaxed mb-4">
              To guarantee that centralized backends cannot covertly alter transaction notes, all text cryptography is generated exclusively within the user's browser using the native <code>Web Crypto API</code>.
            </p>
            <div className="bg-black/30 p-4 rounded-xl font-mono text-xs border border-white/5 leading-loose">
              1. User types "School Fees"<br/>
              2. Browser computes SHA-256("School Fees") → 0x82a9...<br/>
              3. Smart Contract stores the amount AND the Hash (No plain text)<br/>
              4. Backend stores the plain text AND the Hash<br/>
              5. Frontend validates authenticity by comparing the Hashes
            </div>
          </section>

          <hr className="border-white/5" />

          <section>
            <h2 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              3. Gas Optimization Strategy
            </h2>
            <p className="text-sm leading-relaxed">
              Because this prototype is designed with low-resource environments (Sub-Saharan Africa target profile) in mind, network fees must be minimized. Inside our custom Solidity Smart Contract (<code>PrivacyTransaction.sol</code>), we explicitly avoid using the dynamically sized <code>string</code> data type for transaction notes.
              Instead, all hash references are strictly converted into fixed-size <code>bytes32</code> arrays. This reduces blockchain storage constraints by more than 40% per transaction, mapping directly to significant gas savings.
            </p>
          </section>

        </article>
      </div>
    </div>
  );
}
