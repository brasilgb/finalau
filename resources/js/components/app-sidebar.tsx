import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Building, Building2, Link as Megb, LayoutGrid, Settings, User } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
        active: 'dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Organizações',
        href: route('organizations.index'),
        active: 'organizations.*',
        icon: Building,
    },
    {
        title: 'Filiais',
        href: route('companies.index'),
        active: 'companies.*',
        icon: Building2,
    },
    {
        title: 'Usuários',
        href: route('users.index'),
        active: 'users.*',
        icon: User,
    },
    {
        title: 'Configurações',
        href: route('admsettings.index'),
        active: 'admsettings.*',
        icon: Settings,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'MEGB',
        href: 'https://megb.com.br/',
        icon: Megb,
    }
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
            </SidebarFooter>
        </Sidebar>
    );
}
