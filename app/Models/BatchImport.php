<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BatchImport extends Model
{
    protected $fillable = [
        'type',
        'status',
        'organization_id',
        'company_id',
        'total_records',
        'processed_records',
        'successful_records',
        'failed_records',
        'notes',
    ];

    public function logs()
    {
        return $this->hasMany(BatchImportLog::class);
    }
}
