import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, Building2, Eye, EyeClosed, Save, UserCog } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import Select from 'react-select';
import InputError from "@/components/input-error";
import { Switch } from "@/components/ui/switch";
import { rolesUser } from "@/Utils/dataSelect";
import { useState } from "react";
import { maskCep, maskCnpj, maskPhone, unMask } from "@/Utils/mask";
import { Textarea } from "@/components/ui/textarea";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Filiais',
        href: '/companies',
    },
    {
        title: 'Adicionar',
        href: '/companies',
    },
];

export default function CreateCompany({ organizations }: any) {
    
    const optionsOrganization = organizations.map((organization: any) => ({
        value: organization.id,
        label: organization.name,
    }));

    const { data, setData, post, progress, processing, reset, errors } = useForm({
        organization_id: "",
        cnpj: "",
        companyname: "",
        subnumber: "",
        subname: "",
        cep: "",
        state: "",
        city: "",
        district: "",
        street: "",
        number: "",
        complement: "",
        telephone: "",
        status: false,
        whatsapp: "",
        observation: "",
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        post(route('companies.store'), {
            onSuccess: () => reset(),
        });
    }

    const changeOrganization = (selected: any) => {
        setData('organization_id', selected?.value);
    };

    const handleCep = (cep: string) => {
        const cleanCep = unMask(cep);
        fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
            .then((response) => response.json())
            .then((result) => {
                setData((data) => ({ ...data, state: result.uf }));
                setData((data) => ({ ...data, city: result.localidade }));
                setData((data) => ({ ...data, district: result.bairro }));
                setData((data) => ({ ...data, street: result.logradouro }));
                setData((data) => ({ ...data, complement: result.complemento }));
            })
            .catch((error) => console.error(error));
    };

    return (
        <AppLayout>
            <Head title="Filiais" />
            <div className='flex items-center justify-between h-16 px-4'>
                <div className='flex items-center gap-2'>
                    <Icon iconNode={Building2} className='w-8 h-8' />
                    <h2 className="text-xl font-semibold tracking-tight">Filiais</h2>
                </div>
                <div>
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>

            <div className='flex items-center justify-between p-4'>
                <div>
                    <Button variant={'default'} asChild>
                        <Link
                            href={route('companies.index')}
                        >
                            <ArrowLeft h-4 w-4 />
                            <span>Voltar</span>
                        </Link>
                    </Button>
                </div>
                <div>
                </div>
            </div>

            <div className='p-4'>
                <div className='border rounded-lg p-2'>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-9 gap-4 mt-4">

                            <div className="grid gap-2 col-span-2">
                                <Label htmlFor="cnpj">CNPJ</Label>
                                <Input
                                    value={maskCnpj(data.cnpj)}
                                    type="text"
                                    id="cnpj"
                                    onChange={(e) => setData('cnpj', e.target.value)}
                                />
                                {errors.cnpj && <div className="text-red-500 text-sm">{errors.cnpj}</div>}
                            </div>

                            <div className="grid gap-2 col-span-2">
                                <Label htmlFor="companyname">Razão social</Label>
                                <Input
                                    value={data.companyname}
                                    type="text"
                                    id="companyname"
                                    onChange={(e) => setData('companyname', e.target.value)}
                                />
                                {errors.companyname && <div className="text-red-500 text-sm">{errors.companyname}</div>}
                            </div>

                            <div className="col-span-2 grid gap-2">
                                <Label htmlFor="organization_id">Organização</Label>
                                <Select
                                    options={optionsOrganization}
                                    onChange={changeOrganization}
                                    placeholder="Selecione a organização"
                                    className="shadow-xs p-0 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-9"
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            fontSize: '14px',
                                            boxShadow: 'none',
                                            border: 'none',
                                            background: 'transparent',
                                            paddingBottom: '2px',
                                        }),
                                        dropdownIndicator: (base) => ({
                                            ...base,

                                        }),
                                        menuList: (base) => ({
                                            ...base,
                                            fontSize: '14px',
                                        }),
                                    }}
                                />
                                <InputError className="mt-2" message={errors.organization_id} />
                            </div>

                            <div className="grid gap-2 col-span-2">
                                <Label htmlFor="subname">Nome da filial</Label>
                                <Input
                                    value={data.subname}
                                    type="text"
                                    id="subname"
                                    onChange={(e) => setData('subname', e.target.value)}
                                />
                                {errors.subname && <div className="text-red-500 text-sm">{errors.subname}</div>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="subnumber">N° Filial</Label>
                                <Input
                                    id="subnumber"
                                    type="text"
                                    value={data.subnumber}
                                    onChange={(e) => setData('subnumber', e.target.value)}
                                />
                                {errors.subnumber && <div className="text-red-500 text-sm">{errors.subnumber}</div>}
                            </div>

                        </div>

                        <div className="grid grid-cols-9 gap-4 mt-4">
                            <div className="grid gap-2">
                                <Label htmlFor="cep">CEP</Label>
                                <Input
                                    id="cep"
                                    type="text"
                                    value={maskCep(data.cep)}
                                    onChange={(e) => setData('cep', e.target.value)}
                                    onBlurCapture={() => handleCep(data.cep)}
                                    maxLength={9}
                                />
                                {errors.cep && <div className="text-red-500 text-sm">{errors.cep}</div>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="state">UF</Label>
                                <Input
                                    value={data.state}
                                    type="text"
                                    id="state"
                                    onChange={(e) => setData('state', e.target.value)}
                                />
                                {errors.state && <div className="text-red-500 text-sm">{errors.state}</div>}
                            </div>

                            <div className="col-span-2 grid gap-2">
                                <Label htmlFor="city">Cidade</Label>
                                <Input
                                    type="text"
                                    id="city"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                />
                            </div>

                            <div className="col-span-2 grid gap-2">
                                <Label htmlFor="district">Bairro</Label>
                                <Input
                                    type="text"
                                    id="district"
                                    value={data.district}
                                    onChange={(e) => setData('district', e.target.value)}
                                />
                            </div>

                            <div className="col-span-2 grid gap-2">
                                <Label htmlFor="street">Logradouro</Label>
                                <Input
                                    type="text"
                                    id="street"
                                    value={data.street}
                                    onChange={(e) => setData('street', e.target.value)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="number">Número</Label>
                                <Input
                                    type="text"
                                    id="number"
                                    value={data.number}
                                    onChange={(e) => setData('number', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mt-4">

                            <div className="col-span-2 grid gap-2">
                                <Label htmlFor="complement">Complemento</Label>
                                <Input
                                    type="text"
                                    id="complement"
                                    value={data.complement}
                                    onChange={(e) => setData('complement', e.target.value)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="telephone">Telefone</Label>
                                <Input
                                    type="text"
                                    id="telephone"
                                    value={maskPhone(data.telephone)}
                                    onChange={(e) => setData('telephone', e.target.value)}
                                />
                                {errors.telephone && <div className="text-red-500 text-sm">{errors.telephone}</div>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="whatsapp">Whatsapp</Label>
                                <Input
                                    type="text"
                                    id="whatsapp"
                                    value={data.whatsapp}
                                    onChange={(e) => setData('whatsapp', e.target.value)}
                                />
                            </div>

                        </div>

                        <div className="mt-4">
                            <Label htmlFor="observation">Observações</Label>
                            <Textarea
                                id="observation"
                                value={data.observation}
                                onChange={(e) => setData('observation', e.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <div className="grid gap-2">
                                <Label htmlFor="status">Status da filial</Label>
                                <Switch
                                    id="status"
                                    checked={data.status}
                                    onCheckedChange={(checked: any) => setData('status', checked)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing}>
                                <Save />
                                Salvar
                            </Button>
                        </div>
                    </form>
                </div>
            </div >
        </AppLayout >
    )
}
