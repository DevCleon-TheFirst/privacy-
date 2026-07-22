/**
 * Hashes a string using standard SHA-256 (Web Crypto API).
 * This runs ENTIRELY OFF-CHAIN inside the user's browser.
 * 
 * @param {string} data - Plain text to hash (e.g., the note)
 * @returns {Promise<string>} - Returns an Ethereum-compatible bytes32 string (0x...)
 */
export async function hashData(data) {
    if (!data) return ethers.ZeroHash;
  
    const encoder = new TextEncoder();
    const dataBuf = encoder.encode(data);
    
    // Hash using browser's native crypto
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuf);
    
    // Convert to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    
    return "0x" + hashHex;
}
