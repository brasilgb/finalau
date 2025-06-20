import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    active?: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    show?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    organization_id: string;
    company_id: string;
    name: string;
    email: string;
    password: string;
    status: boolean;
    roles: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Company {
    id: string;
    corpreason: string;
    cnpj: string;
    subnumber: string;
    subname: string;
    cep: string;
    state: string;
    city: string;
    district: string;
    street: string;
    number: string;
    complement: string;
    telefone: string;
    status: string;
    whatsapp: string;
    observation: string;
    organizationId: string;
    createdAt: string;
}

export interface Organization {
    id: string;
    name: string;
    cnpj: string;
    status: boolean;
    createdAt: string;
}

export interface Associations {
    id: string;
    assoc_cnpj: string;
    assoc_filial: string;
    assoc_datmvt: string;
    assoc_ass: string;
    assoc_desass: string;
    assoc_valdev: string;
    assoc_valven: string;
    assoc_margem: string;
    assoc_repres: string;
    assoc_metdia: string;
    createdAt: string;
}

export interface Sales {
    id: string;
    resumo_cnpj: string;
    resumo_codfil: string;
    resumo_desfil: string;
    resumo_datmvt: string;
    resumo_yearmonth: string;
    resumo_valdev: string;
    resumo_valven: string;
    resumo_margem: string;
    resumo_presen: string;
    resumo_metdia: string;
    createdAt: string;
}

export interface Setting {
    id: string;
    name: string;
    logo: string;
    organizationId: string;
}

export interface Totals {
    id: string;
    total_cnpj: string;
    total_datatu: string;
    total_filial: string;
    total_valdev: string;
    total_valven: string;
    total_margem: string;
    total_permet: string;
    total_projec: string;
    total_valjur: string;
    total_perjur: string;
    total_valina: string;
    total_perina: string;
    total_valest: string;
    total_meta: string;
    createdAt: string;
}