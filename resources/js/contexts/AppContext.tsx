import { createContext, ReactNode, useContext, useState } from "react";

const AppContext = createContext({} as any);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const [companyNumber, setCompanyNumber] = useState<string>('1');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [ loading, setLoading] = useState<boolean>(false);

    return (
        <AppContext.Provider value={{
            companyNumber,
            setCompanyNumber,
            selectedDate,
            setSelectedDate,
            loading,
            setLoading
        }}>
            {children}
        </AppContext.Provider>
    );
};

export function useAppContext() {
    return useContext(AppContext);
}