<?php

namespace App\Models;

use App\Multitenantable;
use Illuminate\Database\Eloquent\Model;

class AdmSetting extends Model
{
    use Multitenantable;
    protected $table = 'settings';
    protected $fillable = [
        'id',
        'organization_id',
        'name',
        'logo',
    ];
    //
}
