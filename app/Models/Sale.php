<?php

namespace App\Models;

use App\Multitenantable;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use Multitenantable;
}
