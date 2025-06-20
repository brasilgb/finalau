<?php

namespace App\Models;

use App\Multitenantable;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use Multitenantable;
    protected $fillable = [
        'id',
        'organization_id',
        'resumo_cnpj',
        'resumo_codfil',
        'resumo_desfil',
        'resumo_datmvt',
        'resumo_yearmonth',
        'resumo_valdev',
        'resumo_valven',
        'resumo_margem',
        'resumo_presen',
        'resumo_metdia',
    ];
}
