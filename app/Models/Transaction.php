<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'tx_hash',
        'wallet_address',
        'receiver',
        'amount',
        'note',
        'data_hash',
        'stealth_address',
        'ephemeral_key',
        'status',
    ];

    /**
     * The attributes that should be cast.
     * AES-256 encryption is applied to all sensitive off-chain fields.
     * Even if the database is compromised, these fields remain encrypted at rest.
     */
    protected $casts = [
        'note'           => 'encrypted', // Encrypts the private note in the DB
        'receiver'       => 'encrypted', // Encrypts the real receiver address
        'ephemeral_key'  => 'encrypted', // Encrypts the ephemeral key
    ];
}
