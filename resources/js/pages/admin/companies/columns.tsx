"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit } from "lucide-react"
import moment from "moment"
import { Badge } from "@/components/ui/badge"
import { Company } from "@/types"
import { maskCnpj } from "@/Utils/mask"
import { Link } from "@inertiajs/react"
import ActionDelete from "@/components/action-delete"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "organization.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Organização
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "subname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Filial
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "subnumber",
    header: () => <div className="text-left">N° Filial</div>,
  },
  {
    accessorKey: "cnpj",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CNPJ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const fcnpj = row.original.cnpj
      return (
        <span>{maskCnpj(fcnpj)}</span>
      )
    }
  },
  {
    accessorKey: "telefone",
    header: () => <div className="text-left">Telefone</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const orgs = row.original.status;
      return (
        <div className="">
          {orgs ? <Badge variant="secondary">Ativo</Badge> : <Badge variant="destructive">Inativo</Badge>}</div>
      )
    },
  },
  {
    accessorKey: "created_at",
    header: () => <div className="text-left">Cadastro</div>,
    cell: ({ row }) => {
      const dataa = new Date(row.getValue("created_at"))
      const formatted = moment(dataa).format("DD/MM/YYYY")

      return <div className="text-left font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: " ",
    cell: ({ row }) => {
      const comp = row.original;
      return (
        <div className="flex items-center justify-end gap-2">
          <Button className={`${buttonVariants({ variant: "destructive" })} bg-orange-500 hover:bg-orange-500/90`} size="icon" asChild title="Editar organização">
            <Link href={route('companies.edit', comp.id)}>
              <Edit />
            </Link>
          </Button>
          <ActionDelete title={'esta filial'} url={'register-companies.destroy'} param={comp.id} />
        </div>
      )
    }
  }
]