const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PrivacyTransaction", function () {
  let contract;
  let owner, sender, receiver;

  // Deploy a fresh contract before each test
  beforeEach(async function () {
    [owner, sender, receiver] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("PrivacyTransaction");
    contract = await Factory.deploy();
    await contract.waitForDeployment();
  });

  // ── Helper: create a mock SHA-256 bytes32 hash ─────────────────────────
  function mockHash(str) {
    return ethers.id(str); // ethers.id returns keccak256, acceptable for testing
  }

  // ─── Test Suite ─────────────────────────────────────────────────────────

  describe("Deployment", function () {
    it("Should deploy with zero transactions", async function () {
      expect(await contract.getTransactionCount()).to.equal(0);
    });
  });

  describe("sendTransaction()", function () {
    it("Should record a transaction with correct data", async function () {
      const hash = mockHash("school fees");
      const amount = ethers.parseEther("0.01");

      await contract.connect(sender).sendTransaction(receiver.address, hash, {
        value: amount,
      });

      const tx = await contract.getTransaction(0);
      expect(tx.sender).to.equal(sender.address);
      expect(tx.receiver).to.equal(receiver.address);
      expect(tx.amount).to.equal(amount);
      expect(tx.dataHash).to.equal(hash);
    });

    it("Should increment transaction count", async function () {
      const hash = mockHash("note1");
      await contract.connect(sender).sendTransaction(receiver.address, hash, {
        value: ethers.parseEther("0.001"),
      });
      expect(await contract.getTransactionCount()).to.equal(1);
    });

    it("Should emit TransactionRecorded event", async function () {
      const hash = mockHash("test note");
      const amount = ethers.parseEther("0.005");

      await expect(
        contract.connect(sender).sendTransaction(receiver.address, hash, { value: amount })
      )
        .to.emit(contract, "TransactionRecorded")
        .withArgs(0, sender.address, receiver.address, amount, hash, await getTimestamp());
    });

    it("Should forward ETH to receiver", async function () {
      const amount = ethers.parseEther("0.01");
      const hash = mockHash("payment");
      const balanceBefore = await ethers.provider.getBalance(receiver.address);

      await contract.connect(sender).sendTransaction(receiver.address, hash, { value: amount });

      const balanceAfter = await ethers.provider.getBalance(receiver.address);
      expect(balanceAfter - balanceBefore).to.equal(amount);
    });

    it("Should revert if receiver is zero address", async function () {
      await expect(
        contract.connect(sender).sendTransaction(ethers.ZeroAddress, mockHash("test"), {
          value: ethers.parseEther("0.01"),
        })
      ).to.be.revertedWithCustomError(contract, "InvalidReceiver");
    });

    it("Should revert if amount is zero", async function () {
      await expect(
        contract.connect(sender).sendTransaction(receiver.address, mockHash("test"), { value: 0 })
      ).to.be.revertedWithCustomError(contract, "AmountMustBePositive");
    });
  });

  describe("Indexing", function () {
    it("Should correctly index transactions by sender", async function () {
      const hash = mockHash("tx1");
      await contract.connect(sender).sendTransaction(receiver.address, hash, {
        value: ethers.parseEther("0.001"),
      });

      const indices = await contract.getTransactionsBySender(sender.address);
      expect(indices.length).to.equal(1);
      expect(indices[0]).to.equal(0);
    });

    it("Should correctly index transactions by receiver", async function () {
      const hash = mockHash("tx2");
      await contract.connect(sender).sendTransaction(receiver.address, hash, {
        value: ethers.parseEther("0.001"),
      });

      const indices = await contract.getTransactionsByReceiver(receiver.address);
      expect(indices.length).to.equal(1);
      expect(indices[0]).to.equal(0);
    });
  });

  describe("getTransaction()", function () {
    it("Should revert for out-of-bounds index", async function () {
      await expect(contract.getTransaction(999)).to.be.revertedWithCustomError(
        contract,
        "IndexOutOfBounds"
      );
    });
  });

  // ── Helper ───────────────────────────────────────────────────────────────
  async function getTimestamp() {
    const block = await ethers.provider.getBlock("latest");
    return block.timestamp + 1; // next block
  }
});
