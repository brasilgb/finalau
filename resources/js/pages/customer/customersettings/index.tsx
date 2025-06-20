import { Breadcrumbs } from '@/components/breadcrumbs'
import { Icon } from '@/components/icon';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react'
import { Save, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AlertSuccess from '@/components/app-alert-success';
import HeadingSmall from '@/components/heading-small';
import AppearanceTabs from '@/components/appearance-tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import CustomerLayout from '@/layouts/customer-layout';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/panel',
  },
  {
    title: 'Configurações',
    href: '/panel/customersettings',
  },
];

export default function CustomerSettings({ settings }: any) {
  const { flash, auth } = usePage().props as any;

  const { data, setData, put, progress, processing, errors } = useForm({
    organization_id: auth?.user?.organization_id,
    name: settings?.name,
    logo: null
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    router.post(route('customersettings.update', settings.id), {
      _method: "put",
      name: data?.name,
      logo: data?.logo,
      preserveScroll: true,
    })
  }
  return (
    <CustomerLayout>
      {flash.message && <AlertSuccess message={flash.message} />}
      <Head title="Configurações" />
      <div className='flex items-center justify-between h-16 px-4 mb-4'>
        <div className='flex items-center gap-2'>
          <Icon iconNode={Settings} className='w-8 h-8' />
          <h2 className="text-xl font-semibold tracking-tight">Configurações</h2>
        </div>
        <div>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </div>

      <div className='p-4'>
        <div className="space-y-6">
          <HeadingSmall title="Configurações de aparência" description="Altere a aparencia do sistema entre temas claro ou escuro." />
          <AppearanceTabs />
        </div>
        {auth?.user?.company_id === null &&
          <>
            <div className="w-24 my-10">
              <img
                src={`/storage/logos/${settings?.logo ? settings?.logo : "default.png"}`}
                alt="Imagem de logo"
              />
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex flex-col md:w-2xl gap-4 mt-4">

                <div className="grid gap-2">
                  <Label htmlFor="logo">Logotipo</Label>
                  <Input
                    type="file"
                    id="logo"
                    onChange={(e: any) => setData('logo', e.target.files[0])}
                  />
                  {errors.logo && <div className="text-red-500 text-sm">{errors.logo}</div>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="name">Nome curto</Label>
                  <Input
                    type="text"
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end md:w-2xl">
                <Button type="submit" disabled={processing}>
                  <Save />
                  Salvar
                </Button>
              </div>
            </form>
          </>
        }
      </div>
    </CustomerLayout>
  )
}
