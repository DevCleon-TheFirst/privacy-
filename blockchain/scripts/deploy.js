const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("=================================================");
  console.log("  Deploying PrivacyTransaction Smart Contract...");
  console.log("=================================================");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log(`\nDeploying with account: ${deployer.address}`);
  console.log(`Account balance: ${ethers.formatEther(await deployer.provider.getBalance(deployer.address))} ETH`);

  // Deploy the contract
  const PrivacyTransaction = await ethers.getContractFactory("PrivacyTransaction");
  const contract = await PrivacyTransaction.deploy();
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();

  console.log("\n✅ Contract deployed successfully!");
  console.log(`   Contract address: ${contractAddress}`);
  console.log(`   Network:          ${(await ethers.provider.getNetwork()).name}`);
  console.log(`   Chain ID:         ${(await ethers.provider.getNetwork()).chainId}`);

  // ── Save deployment info to JSON (used by frontend) ──────────────────────
  const deploymentInfo = {
    contractAddress,
    network:   (await ethers.provider.getNetwork()).name,
    chainId:   Number((await ethers.provider.getNetwork()).chainId),
    deployedAt: new Date().toISOString(),
    deployer:  deployer.address,
  };

  const outDir = path.join(__dirname, "../artifacts");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(
    path.join(outDir, "deployment.json"),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("\n📄 Deployment info saved to: blockchain/artifacts/deployment.json");
  console.log("\n⚠️  IMPORTANT: Copy this address to your frontend/.env:");
  console.log(`   VITE_CONTRACT_ADDRESS=${contractAddress}`);
  console.log("=================================================\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
