import { Breadcrumbs } from '@/components/breadcrumbs'
import { Icon } from '@/components/icon'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import CustomerLayout from '@/layouts/customer-layout'
import { BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react'
import { Logs as LogsIcon } from 'lucide-react'
import moment from 'moment'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/',
  },
  {
    title: 'Logs de dados',
    href: '/logs',
  },
];

export default function LogsDeDados({ logs }: any) {
  return (
    <CustomerLayout>
      <Head title="Logs de dados" />
      <div className='flex items-center justify-between h-16 px-4 mb-4'>
        <div className='flex items-center gap-2'>
          <Icon iconNode={LogsIcon} className='w-8 h-8' />
          <h2 className="text-xl font-semibold tracking-tight">Logs de gravação de dados</h2>
        </div>
        <div>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </div>

      <div className='p-4'>
        <div className='border rounded-lg'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entrada</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total de linhas</TableHead>
                <TableHead>Processados</TableHead>
                <TableHead>Sucesso</TableHead>
                <TableHead>Falhados</TableHead>
                <TableHead>Mensagens</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs?.map((log: any) => (
                <TableRow>
                  <TableCell>{moment(log?.created_at).format("DD/MM/YYYY")}</TableCell>
                  <TableCell>{log?.type}</TableCell>
                  <TableCell>{log?.status}</TableCell>
                  <TableCell>{log?.total_records}</TableCell>
                  <TableCell>{log?.processed_records}</TableCell>
                  <TableCell>{log?.successful_records}</TableCell>
                  <TableCell>{log?.failed_records}</TableCell>
                  <TableCell>{log?.notes}</TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </div>
      </div>

    </CustomerLayout>
  )
}