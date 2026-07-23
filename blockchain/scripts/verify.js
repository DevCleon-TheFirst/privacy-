const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const PrivacyTransaction = await ethers.getContractFactory("PrivacyTransaction");
  const contract = PrivacyTransaction.attach(contractAddress);
  
  const count = await contract.getTransactionCount();
  if (count === 0n) {
      console.log("No transactions found on the blockchain yet.");
      return;
  }
  
  const latestTx = await contract.getTransaction(count - 1n);
  
  console.log("=================================================");
  console.log("  🔍 WHAT THE PUBLIC BLOCKCHAIN SEES");
  console.log("=================================================");
  console.log(`Sender:          ${latestTx.sender}`);
  console.log(`Stealth Address: ${latestTx.stealthReceiver}  <-- THE REAL RECEIVER IS HIDDEN!`);
  console.log(`Amount Hash:     ${latestTx.amountHash}  <-- THE REAL AMOUNT IS HIDDEN!`);
  console.log(`Note Hash:       ${latestTx.dataHash}  <-- THE REAL NOTE IS HIDDEN!`);
  console.log("=================================================");
}

main().catch(console.error);
