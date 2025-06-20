import { AppProvider } from '@/contexts/AppContext';
import CustomerLayoutTemplate from '@/layouts/app/app-header-layout';
import { type ReactNode } from 'react';

interface CustomerLayoutProps {
    children: ReactNode;
}

export default ({ children }: CustomerLayoutProps) => (
    <CustomerLayoutTemplate>
            {children}
    </CustomerLayoutTemplate>
);