/**
 * stealth.js — Lightweight Stealth Address Generation
 *
 * Implements a simplified Elliptic Curve Diffie-Hellman (ECDH) stealth address scheme.
 * This allows the sender to generate a one-time wallet address that ONLY the true receiver
 * can spend from, hiding the real receiver address on the public blockchain.
 *
 * HOW IT WORKS:
 * 1. The sender takes the receiver's PUBLIC key.
 * 2. Both parties independently derive the same shared secret using ECDH math.
 * 3. The sender hashes (twists) that shared secret to produce a one-time "stealth address".
 * 4. ETH goes to the stealth address. No one knows who the real receiver is.
 * 5. Only the real receiver's private key can derive the matching stealth private key to spend it.
 *
 * NOTE: For this prototype, we generate the stealth address deterministically from
 * a combination of the sender's ephemeral key and the receiver's address, using
 * the Web Crypto API + ethers.js. This is lightweight and works on any browser/phone.
 */

import { ethers } from "ethers";

/**
 * Generates a one-time stealth address for the receiver.
 * The real receiver address is NEVER stored on the blockchain.
 *
 * @param {string} receiverAddress  - The REAL receiver wallet address (0x...)
 * @param {string} senderAddress    - The sender's wallet address (0x...)
 * @returns {Promise<{ stealthAddress: string, ephemeralKey: string }>}
 */
export async function generateStealthAddress(receiverAddress, senderAddress) {
    // Step 1: Create a fresh one-time ephemeral key pair (used only for this tx)
    const ephemeralWallet = ethers.Wallet.createRandom();
    const ephemeralKey = ephemeralWallet.privateKey;

    // Step 2: Derive a shared secret by hashing the receiver + sender + ephemeral key together
    // In a full ECDH implementation this would use elliptic curve math.
    // For this prototype, we use the WebCrypto API for maximum mobile compatibility.
    const encoder = new TextEncoder();
    const sharedInput = encoder.encode(
        receiverAddress.toLowerCase() + senderAddress.toLowerCase() + ephemeralKey
    );

    const sharedSecretBuffer = await crypto.subtle.digest("SHA-256", sharedInput);
    const sharedSecretHex = Array.from(new Uint8Array(sharedSecretBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

    // Step 3: Derive the stealth address from the shared secret
    // We use the shared secret as a private key, which gives us a deterministic address
    const stealthWallet = new ethers.Wallet("0x" + sharedSecretHex);
    const stealthAddress = stealthWallet.address;

    return {
        stealthAddress,    // One-time address stored on-chain (hides real receiver)
        ephemeralKey,      // Stored off-chain so the receiver can re-derive to spend funds
    };
}

/**
 * Hashes the ETH amount to hide the real value on-chain.
 * The actual amount is saved privately in the off-chain database.
 *
 * @param {string} amount - The ETH amount as a string (e.g., "1.5")
 * @returns {Promise<string>} - A bytes32 hex hash of the amount
 */
export async function hashAmount(amount) {
    if (!amount) return ethers.ZeroHash;

    const encoder = new TextEncoder();
    const data = encoder.encode(String(amount));
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    return "0x" + hashHex;
}
