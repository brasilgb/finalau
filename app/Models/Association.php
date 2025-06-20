<?php

namespace App\Models;

use App\Multitenantable;
use Illuminate\Database\Eloquent\Model;

class Association extends Model
{
    use Multitenantable;
    protected $fillable = [
        'id',
        'organization_id',
        'assoc_cnpj',
        'assoc_filial',
        'assoc_datmvt',
        'assoc_ass',
        'assoc_desass',
        'assoc_valdev',
        'assoc_valven',
        'assoc_margem',
        'assoc_repres',
        'assoc_metdia',
    ];
}
