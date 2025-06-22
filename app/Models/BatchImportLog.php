<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BatchImportLog extends Model
{
    protected $fillable = [
        'batch_import_id',
        'record_identifier',
        'status',
        'data_processed',
        'message',
        'errors',
    ];

    protected $casts = [
        'data_processed' => 'array',
        'errors' => 'array',
    ];

    public function batchImport()
    {
        return $this->belongsTo(BatchImport::class);
    }
}
