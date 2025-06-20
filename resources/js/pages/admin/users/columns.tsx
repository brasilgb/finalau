import { Button, buttonVariants } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit } from "lucide-react"
import moment from "moment"
import { Badge } from "@/components/ui/badge"
import { Company } from "@/types"
import { Link } from "@inertiajs/react"
import ActionDelete from "@/components/action-delete"
import { roleUserByValue } from "@/Utils/functions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<Company>[] = [
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
    accessorKey: "email",
    header: () => <div className="text-left">E-mail</div>,
  },
  {
    accessorKey: "roles",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Função
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const orgs = row.original.status;
      return (
        <div className="">
          {roleUserByValue(parseInt(orgs))}
        </div>
      )
    },
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
          {orgs ? <Badge variant={'default'}>Ativo</Badge> : <Badge variant={'destructive'}>Inativo</Badge>}</div>
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
          <Button className={`${buttonVariants({ variant: "destructive" })} bg-orange-500 hover:bg-orange-500/90 dark:bg-orange-500 dark:hover:bg-orange-500/90`} size="icon" asChild title="Editar usuário">
            <Link href={route('users.edit', comp.id)}>
              <Edit />
            </Link>
          </Button>
          <ActionDelete title={'este usuário'} url={'users.destroy'} param={comp.id} />
        </div>
      )
    }
  }
]