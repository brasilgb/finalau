<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

trait Multitenantable
{
    protected static function bootMultitenantable()
    {
        if (Auth::check()) {

            // static::creating(function ($model) {
            //     $model->organization_id = Auth::user()->organization_id;
            // });

            if (Auth::user()->organization_id !== null) {
                static::addGlobalScope('organization_id', function (Builder $builder) {
                    $builder->where('organization_id', Auth::user()->organization_id);
                });
            }
        }
    }
}
