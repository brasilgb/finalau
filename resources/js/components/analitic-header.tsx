import React from 'react'
import { Button } from './ui/button'
import { Calendar, Download, Filter } from 'lucide-react'
import { FilterDate } from './select-date';
import FilterCompany from './select-city';

interface AnaliticHeaderProps {
  title: string;
  subtitle: string;
}
export default function AnaliticHeader({ title, subtitle }: AnaliticHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          <div className="flex gap-2">
            {/* <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button> */}
            <div>
              <FilterCompany />
            </div>
            {/* <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button> */}
            {/* <Button size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Período
            </Button> */}
            <div>
              <FilterDate />
            </div>
          </div>
        </div>
  )
}
