import AnaliticHeader from '@/components/analitic-header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CustomerLayout from '@/layouts/customer-layout'
import { Head } from '@inertiajs/react'
import Summary from './summary'
import Association from './association'
import 'animate.css';
export default function Invoicing() {
  return (
    <CustomerLayout>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <AnaliticHeader title='Análise sobre faturamento' subtitle='Análise do faturamento resumida e por associação' />
        <div className="">

          <Tabs defaultValue="summary" className="space-y-4">
            <TabsList>
              <TabsTrigger value="summary">Resumo Geral</TabsTrigger>
              <TabsTrigger value="association">Associação</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4 animate__animated animate__fadeIn">
              <Summary />
            </TabsContent>
            <TabsContent value="association" className="space-y-4 animate__animated animate__fadeIn">
              <Association />
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </CustomerLayout>
  )
}
