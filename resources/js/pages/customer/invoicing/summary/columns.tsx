"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit } from "lucide-react"
import moment from "moment"
import { Badge } from "@/components/ui/badge"
import { Company } from "@/types"
import { maskCnpj, maskMoney } from "@/Utils/mask"
import { Link } from "@inertiajs/react"
import ActionDelete from "@/components/action-delete"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "resumo_datmvt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data venda
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const dataa = row.getValue("resumo_datmvt") as any
      const formatted = moment(dataa).format("DD/MM/YYYY")

      return <div className="text-left font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "resumo_desfil",
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
    accessorKey: "resumo_metdia",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Meta
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const meta = row.getValue("resumo_metdia") as any
      return (
        <span>R$ {maskMoney(meta)}</span>
      )
    }
  },
  {
    accessorKey: "resumo_valven",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Venda
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const venda = row.getValue("resumo_valven") as any
      return (
        <span>R$ {maskMoney(venda)}</span>
      )
    }
  },
  {
    accessorKey: "resumo_margem",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Margem
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const venda = row.getValue("resumo_margem") as any
      return (
        <span>{venda}%</span>
      )
    }
  },
  {
    accessorKey: "resumo_presen",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Representa
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const venda = row.getValue("resumo_presen") as any
      return (
        <span>{venda}%</span>
      )
    }
  },
]