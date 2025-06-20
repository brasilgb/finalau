<?php

namespace App\Models;

use App\Multitenantable;
use Illuminate\Database\Eloquent\Model;

class Total extends Model
{
    use Multitenantable;
    protected $fillable = [
        'id',
        'organization_id',
        'total_cnpj',
        'total_datatu',
        'total_filial',
        'total_valdev',
        'total_valven',
        'total_margem',
        'total_permet',
        'total_projec',
        'total_valjur',
        'total_perjur',
        'total_valina',
        'total_perina',
        'total_valest',
        'total_meta'
    ];
}
