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
            $table->string('tx_hash', 200)->unique();        // Blockchain transaction hash
            $table->string('wallet_address', 100);           // Sender's real Ethereum address
            $table->text('receiver');                        // REAL receiver address — AES-256 encrypted (longer than 42 chars)
            $table->decimal('amount', 18, 8);                // REAL ETH amount
            $table->text('note');                            // REAL private note — AES-256 encrypted
            $table->string('data_hash', 200);                // SHA-256 hash linking to the on-chain note proof
            $table->text('stealth_address')->nullable();     // One-time stealth address used on-chain — AES-256 encrypted
            $table->text('ephemeral_key')->nullable();          // Ephemeral key — AES-256 encrypted
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
