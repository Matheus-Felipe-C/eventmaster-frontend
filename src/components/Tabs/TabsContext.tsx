import { createContext } from 'react';

export type TabsContextType = {
    activeTab: string;
    setActiveTab: (value: string) => void;
};

export const TabsContext = createContext<TabsContextType | undefined>(
    undefined
);
