import AlertSuccess from '@/components/app-alert-success';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Building, Plus } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/',
  },
  {
    title: 'Dados da organização',
    href: '/organizations',
  },
];

export default function Companies({ companies }: any) {
  const { flash } = usePage().props as any;

  return (
    <AppLayout>
      {flash.message && <AlertSuccess message={flash.message} />}
      <Head title="Filiais" />
      <div className='flex items-center justify-between h-16 px-4'>
        <div className='flex items-center gap-2'>
          <Icon iconNode={Building} className='w-8 h-8' />
          <h2 className="text-xl font-semibold tracking-tight">Filiais</h2>
        </div>
        <div>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </div>

      <div className='p-4'>
        <DataTable
          columns={columns}
          data={companies}
          label={'Filial'}
          link={
            <Button asChild>
              <Link href={route('companies.create')}>
                <Plus />Filial
              </Link>
            </Button>
          }
          filter={'subname'}
        />
      </div>

    </AppLayout>
  )
}
