import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Building, Edit, Pencil, Plus, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { maskCnpj } from '@/Utils/mask';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Organizações',
        href: '/organizations',
    },
    {
        title: 'Adicionar',
        href: '/organizations',
    },
];

export default function EditOrganization({ organization }: any) {
    const { flash } = usePage().props as any;
    const [open, setOpen] = useState(false)
    const { data, setData, put, progress, processing, reset, errors } = useForm({
        name: organization?.name,
        cnpj: organization?.cnpj,
        status: organization?.status,
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        put(route('organizations.update', organization?.id));
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={'icon'} className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Editar Organização</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className='space-y-8' autoComplete='off'>
                    <div className="gap-4 mt-4">

                        <div className="grid gap-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                value={data.name}
                                type="text"
                                id="name"
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                        </div>

                        <div className="grid gap-2 mt-4">
                            <Label htmlFor="cnpj">CNPJ</Label>
                            <Input
                                value={maskCnpj(data.cnpj)}
                                type="text"
                                id="cnpj"
                                onChange={(e) => setData('cnpj', e.target.value)}
                                maxLength={18}
                            />
                            {errors.cnpj && <div className="text-red-500 text-sm">{errors.cnpj}</div>}
                        </div>

                        <div className="grid gap-2 mt-4">
                            <Label htmlFor="status">Ativar organização</Label>
                            <Switch
                                id="status"
                                checked={data.status}
                                onCheckedChange={(checked: any) => setData('status', checked)}
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save />
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}
