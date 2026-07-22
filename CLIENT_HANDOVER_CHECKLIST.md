# 📦 Production Handover Checklist

Since the **Privacy-Enhanced Blockchain Prototype** has been deployed online, you will need to transfer ownership of the live assets, source code, and credentials to the client. Use this checklist to ensure you don't miss anything.

## 1. Source Code & Repositories
- [ ] **GitHub / GitLab / Bitbucket:** Transfer repository ownership to the client's account or grant them "Admin" privileges if it's on an organization account.
- [ ] Ensure the `main` or `master` branch reflects the exact code that is currently deployed in production.
- [ ] Provide the `HANDOVER_DOC.md` (which we created earlier) in the repository's root.

## 2. Smart Contract & Blockchain Assets
- [ ] **Contract Addresses:** Provide the live deployed smart contract addresses (e.g., on Ethereum Mainnet, Polygon, or a Testnet like Sepolia) along with links to the Block Explorer (e.g., Etherscan).
- [ ] **Contract Verification:** Ensure the smart contract code is verified on the block explorer so the client can interact with it publicly.
- [ ] **Admin / Deployer Wallet:** If the smart contract has an "Owner" address that controls administrative functions (like pausing the contract or upgrading it), transfer that ownership to the client's hardware wallet or MetaMask address. 
  - *Note: NEVER send your own private keys. Only transfer contract ownership via the contract's `transferOwnership` function if applicable.*
- [ ] **RPC Providers:** Transfer or provide API keys for node providers used in production (e.g., Alchemy, Infura, QuickNode).

## 3. Web Hosting & Infrastructure
- [ ] **Frontend Hosting:** Transfer ownership of the frontend project (e.g., Vercel, Netlify, AWS Amplify).
- [ ] **Backend Hosting:** Transfer ownership of the server running the Laravel API (e.g., DigitalOcean Droplet, AWS EC2, Heroku, Forge). 
- [ ] **Domain Name:** Transfer the domain name (e.g., from Namecheap, GoDaddy, or Route53) to the client's registrar account.
- [ ] **DNS Records:** Ensure they have access to where the DNS records are currently managed (e.g., Cloudflare).

## 4. Databases & Storage
- [ ] **Database Access:** Provide production database credentials (Host, Port, Database Name, User, Password).
- [ ] **Database Backups:** Provide a final SQL dump / backup of the current production database.

## 5. Environment Variables & Credentials
*Securely share these using a one-time encrypted link (e.g., Bitwarden Send, 1Password, or Privnote) – NEVER send these in plain text over email or Slack.*
- [ ] Provide the production `.env` file for the **Frontend** (React/Vite).
- [ ] Provide the production `.env` file for the **Backend** (Laravel), which includes:
  - `APP_KEY`
  - Database Credentials
  - Any external API keys

## 6. Accounts & Third-Party Services
If you used any of the following services, transfer the billing and admin rights to the client:
- [ ] **Analytics / Monitoring:** Google Analytics, Sentry, Datadog.
- [ ] **Email Delivery:** SendGrid, Mailgun, AWS SES (if the backend sends emails).
- [ ] **SSL Certificates:** If manually managed, provide the keys/certs (though usually auto-managed by Let's Encrypt / Cloudflare).

## 7. Next Steps for the Client
Once you provide all the above, advise the client to:
1. Update the billing information on all hosting platforms (AWS, Vercel, etc.) to their own credit cards to prevent service disruption.
2. Rotate (change) the database passwords and API keys for security, if they have their own IT team.
3. Review the `HANDOVER_DOC.md` for understanding the system architecture.
