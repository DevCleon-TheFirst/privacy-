// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PrivacyTransaction (v2 - Full Privacy Layer)
 * @dev Stores ZERO sensitive data on-chain.
 *      - Receiver address is a one-time ECDH Stealth Address (hides the real receiver).
 *      - Amount is stored only as a SHA-256 hash (hides the real value).
 *      - Note is stored only as a SHA-256 hash (hides the real note).
 *      Real receiver, real amount, and real note all live off-chain in the private Laravel DB.
 */
contract PrivacyTransaction {

    // ─── Data Structure ──────────────────────────────────────────────────────

    struct Transaction {
        address sender;
        address stealthReceiver; // One-time ECDH stealth address — NOT the real receiver
        bytes32 amountHash;      // SHA-256 hash of the real ETH amount — hides the value
        bytes32 dataHash;        // SHA-256 hash of the off-chain note
        uint256 timestamp;
    }

    // ─── State ────────────────────────────────────────────────────────────────

    Transaction[] private transactions;

    mapping(address => uint256[]) private senderIndex;
    mapping(address => uint256[]) private stealthIndex; // stealth addr → tx indices

    // ─── Events ───────────────────────────────────────────────────────────────

    event TransactionRecorded(
        uint256 indexed id,
        address indexed sender,
        address indexed stealthReceiver,  // stealth addr logged, NOT real receiver
        bytes32 amountHash,               // hashed amount, NOT the real ETH value
        bytes32 dataHash,
        uint256 timestamp
    );

    // ─── Errors ───────────────────────────────────────────────────────────────

    error InvalidReceiver();
    error AmountMustBePositive();
    error IndexOutOfBounds();

    // ─── Functions ────────────────────────────────────────────────────────────

    /**
     * @notice Send ETH and record a fully private transaction on-chain.
     * @param _stealthReceiver  One-time ECDH stealth address (NOT the real wallet).
     * @param _amountHash       SHA-256 hash of the real ETH amount string (hides value).
     * @param _dataHash         SHA-256 hash of the off-chain note.
     */
    function sendTransaction(
        address _stealthReceiver,
        bytes32 _amountHash,
        bytes32 _dataHash
    ) external payable {
        if (_stealthReceiver == address(0)) revert InvalidReceiver();
        if (msg.value == 0) revert AmountMustBePositive();

        uint256 id = transactions.length;

        Transaction memory newTx = Transaction({
            sender:          msg.sender,
            stealthReceiver: _stealthReceiver,
            amountHash:      _amountHash,
            dataHash:        _dataHash,
            timestamp:       block.timestamp
        });

        transactions.push(newTx);
        senderIndex[msg.sender].push(id);
        stealthIndex[_stealthReceiver].push(id);

        // Forward ETH to the REAL receiver via the stealth address mechanism.
        // The stealth address's private key is derived by the real receiver off-chain.
        (bool success, ) = payable(_stealthReceiver).call{value: msg.value}("");
        require(success, "ETH transfer failed");

        emit TransactionRecorded(id, msg.sender, _stealthReceiver, _amountHash, _dataHash, block.timestamp);
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
     * @notice Total number of transactions on-chain.
     */
    function getTransactionCount() external view returns (uint256) {
        return transactions.length;
    }
}
