require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200, // Optimize for deployment (fewer runs = smaller bytecode)
      },
    },
  },

  networks: {
    // ── Local Development (default) ──────────────────────────────────────────
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },

    // ── Sepolia Testnet ───────────────────────────────────────────────────────
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_URL || "",
      accounts: process.env.METAMASK_PRIVATE_KEY
        ? [process.env.METAMASK_PRIVATE_KEY]
        : [],
      chainId: 11155111,
    },
  },

  // ── Etherscan Verification (optional) ────────────────────────────────────
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY,
  // },

  paths: {
    sources:   "./contracts",
    tests:     "./test",
    cache:     "./cache",
    artifacts: "./artifacts",
  },
};
