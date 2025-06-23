import { Breadcrumbs } from "@/components/breadcrumbs";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { BreadcrumbItem } from "@/types";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, Eye, EyeClosed, Save, UserCog } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import Select from 'react-select';
import InputError from "@/components/input-error";
import { Switch } from "@/components/ui/switch";
import { rolesUser } from "@/Utils/dataSelect";
import { useState } from "react";
import CustomerLayout from "@/layouts/customer-layout";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/panel',
  },
  {
    title: 'Usuários',
    href: '/panel/customerusers',
  },
  {
    title: 'Adicionar',
    href: '/panel/users',
  },
];

export default function CreateUser({ companies }: any) {
  const { auth } = usePage().props as any;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const optionsCompany = companies.map((company: any) => ({
    value: company.id,
    label: company.subname,
  }));

  const { data, setData, post, progress, processing, reset, errors } = useForm({
    organization_id: auth.user.organization_id,
    company_id: '',
    name: '',
    email: '',
    roles: '',
    status: false,
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    post(route('customerusers.store'), {
      onSuccess: () => reset(),
    });
  }

  const changeRoles = (selected: any) => {
    setData('roles', selected?.value);
  };

  const changeCompany = (selected: any) => {
    setData('company_id', selected?.value);
  };

  return (
    <CustomerLayout>
      <Head title="Usuários" />
      <div className='flex items-center justify-between h-16 px-4'>
        <div className='flex items-center gap-2'>
          <Icon iconNode={UserCog} className='w-8 h-8' />
          <h2 className="text-xl font-semibold tracking-tight">Usuários</h2>
        </div>
        <div>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </div>

      <div className='flex items-center justify-between p-4'>
        <div>
          <Button variant={'default'} asChild>
            <Link
              href={route('customerusers.index')}
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
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="company_id">Filial</Label>
                <Select
                  options={optionsCompany}
                  onChange={changeCompany}
                  placeholder="Selecione a filial"
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
                <InputError className="mt-2" message={errors.company_id} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  value={data.name}
                  type="text"
                  id="name"
                  onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="text"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                />
                {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
              </div>


            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                  />
                  <div className='absolute top-0 right-0 text-gray-600'>
                    <Button
                      variant={"link"}
                      size={"icon"}
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeClosed /> : <Eye />}
                    </Button>
                  </div>
                </div>
                {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password_confirmation">Confirme a senha</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                  />
                  <div className='absolute top-0 right-0 text-gray-600'>
                    <Button
                      variant={"link"}
                      size={"icon"}
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeClosed /> : <Eye />}
                    </Button>
                  </div>
                </div>
                {errors.password_confirmation && <div className="text-red-500 text-sm">{errors.password_confirmation}</div>}
              </div>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className=" grid gap-2">
                <Label htmlFor="recipient">Funções do usuário</Label>
                <Select
                  options={rolesUser}
                  onChange={changeRoles}
                  placeholder="Selecione o recebedor"
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
                <InputError className="mt-2" message={errors.roles} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Status do usuário</Label>
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
    </CustomerLayout >
  )
}
