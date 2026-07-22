// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PrivacyTransaction
 * @dev Stores minimal transaction data on-chain.
 *      Sensitive data (e.g. notes) are hashed BEFORE being sent here.
 *      Only the hash is stored — never the raw data.
 */
contract PrivacyTransaction {

    // ─── Data Structure ──────────────────────────────────────────────────────

    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;      // in wei
        bytes32 dataHash;    // SHA-256 hash of the off-chain note
        uint256 timestamp;
    }

    // ─── State ────────────────────────────────────────────────────────────────

    Transaction[] private transactions;

    mapping(address => uint256[]) private senderIndex;   // sender → tx indices
    mapping(address => uint256[]) private receiverIndex; // receiver → tx indices

    // ─── Events ───────────────────────────────────────────────────────────────

    event TransactionRecorded(
        uint256 indexed id,
        address indexed sender,
        address indexed receiver,
        uint256 amount,
        bytes32 dataHash,
        uint256 timestamp
    );

    // ─── Errors ───────────────────────────────────────────────────────────────

    error InvalidReceiver();
    error AmountMustBePositive();
    error IndexOutOfBounds();

    // ─── Functions ────────────────────────────────────────────────────────────

    /**
     * @notice Send ETH to a receiver and record the transaction on-chain.
     * @param _receiver  The destination wallet address.
     * @param _dataHash  SHA-256 hash of the off-chain note (32 bytes).
     */
    function sendTransaction(address _receiver, bytes32 _dataHash) external payable {
        if (_receiver == address(0)) revert InvalidReceiver();
        if (msg.value == 0) revert AmountMustBePositive();

        uint256 id = transactions.length;

        Transaction memory newTx = Transaction({
            sender:    msg.sender,
            receiver:  _receiver,
            amount:    msg.value,
            dataHash:  _dataHash,
            timestamp: block.timestamp
        });

        transactions.push(newTx);
        senderIndex[msg.sender].push(id);
        receiverIndex[_receiver].push(id);

        // Forward ETH to receiver
        (bool success, ) = payable(_receiver).call{value: msg.value}("");
        require(success, "ETH transfer failed");

        emit TransactionRecorded(id, msg.sender, _receiver, msg.value, _dataHash, block.timestamp);
    }

    /**
     * @notice Retrieve a transaction by its index.
     */
    function getTransaction(uint256 _index) external view returns (Transaction memory) {
        if (_index >= transactions.length) revert IndexOutOfBounds();
        return transactions[_index];
    }

    /**
     * @notice Get all transaction indices sent by a given address.
     */
    function getTransactionsBySender(address _sender) external view returns (uint256[] memory) {
        return senderIndex[_sender];
    }

    /**
     * @notice Get all transaction indices received by a given address.
     */
    function getTransactionsByReceiver(address _receiver) external view returns (uint256[] memory) {
        return receiverIndex[_receiver];
    }

    /**
     * @notice Total number of transactions on-chain.
     */
    function getTransactionCount() external view returns (uint256) {
        return transactions.length;
    }
}
