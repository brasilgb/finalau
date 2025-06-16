"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, DatabaseBackup } from "lucide-react"
import moment from "moment"
import { Badge } from "@/components/ui/badge"
import { Organization } from "@/types"
import { maskCnpj } from "@/Utils/mask"
import ActionDelete from "@/components/action-delete"
import EditOrganization from "./edit-organization"
import { Link } from "@inertiajs/react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Organization>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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
      const orgs = row.original;
      return (
        <div className="flex items-center justify-end gap-2">
          <Button className={`${buttonVariants({ variant: "destructive" })} bg-indigo-500 hover:bg-indigo-500/90`} size="icon" title="Limpar dados">
            <Link href={route('truncate')} className="cursor-default">
              <DatabaseBackup />
            </Link>
          </Button>
          <EditOrganization organization={orgs} />
          <ActionDelete title={'esta organização'} url={'organizations.destroy'} param={orgs.id} />
        </div>
      )
    }
  }
]