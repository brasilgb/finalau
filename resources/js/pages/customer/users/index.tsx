import { Breadcrumbs } from '@/components/breadcrumbs'
import { Icon } from '@/components/icon';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react'
import { Pencil, Plus, UserCog } from 'lucide-react';
import moment from 'moment'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import InputSearch from '@/components/inputSearch';
import AlertSuccess from '@/components/app-alert-success';
import { Badge } from '@/components/ui/badge';
import { roleUserByValue } from '@/Utils/functions';
import ActionDelete from '@/components/action-delete';
import AppPagination from '@/components/app-pagination';
import CustomerLayout from '@/layouts/customer-layout';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/',
  },
  {
    title: 'Usuários',
    href: '/users',
  },
];

export default function Users({ users }: any) {
  const { flash, auth } = usePage().props as any;

  if (auth?.user?.company_id) {
    return router.get('/panel')
  }

  return (
    <CustomerLayout>
      {flash.message && <AlertSuccess message={flash.message} />}
      <Head title="Usuários" />
      <div className='flex items-center justify-between h-16 px-4 mb-4'>
        <div className='flex items-center gap-2'>
          <Icon iconNode={UserCog} className='w-8 h-8' />
          <h2 className="text-xl font-semibold tracking-tight">Usuários</h2>
        </div>
        <div>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </div>

      <div className='p-4'>
        <DataTable
          columns={columns}
          data={users}
          label={'Usuário'}
          link={
            <Button asChild>
              <Link href={route('customerusers.create')}>
                <Plus />Usuários
              </Link>
            </Button>
          }
          filter={'name'}
        />
      </div>
    </CustomerLayout>
  )
}
