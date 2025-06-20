<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'organization_id' => 'required',
            'companyname' => 'required',
            'cnpj' => 'required',
            'subname' => 'required',
            'subnumber' => 'required',
            'telephone' => 'required',
        ];
    }

    public function attributes(): array
    {
        return [
            'organization_id' => 'organização',
            'companyname' => 'razão social',
            'subname' => 'filial',
            'subnumber' => 'número da filial',
            'telephone' => 'telefone',
        ];
    }
}
