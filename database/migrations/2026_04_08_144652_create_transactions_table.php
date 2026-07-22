<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('tx_hash', 100)->unique(); // Blockchain transaction hash
            $table->string('wallet_address', 42); // Ethereum address
            $table->string('receiver', 42); // Receiver address
            $table->decimal('amount', 18, 8); // ETH amount
            $table->text('note'); // Private note (off-chain only!)
            $table->string('data_hash', 100); // SHA-256 hash linking to the blockchainote
            $table->enum('status', ['pending', 'failed', 'confirmed'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
