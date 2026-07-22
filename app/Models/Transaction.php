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
        'status',
    ];

    /**
     * The attributes that should be cast.
     * This automatically encrypts the note in the database using AES-256,
     * fulfilling the data confidentiality requirement of the research paper.
     */
    protected $casts = [
        'note' => 'encrypted',
    ];
}
