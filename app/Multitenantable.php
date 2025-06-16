<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

trait Multitenantable
{
    protected static function bootMultitenantable(){
        if(Auth::check()) {
            static::addGlobalScope('organization_id', function (Builder $builder) {
                $builder->where('organization_id', Auth::id());
            });
        }
    }
}
