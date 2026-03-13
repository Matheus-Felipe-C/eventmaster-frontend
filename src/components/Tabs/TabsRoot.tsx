import { useState } from 'react';
import styles from './styles.module.css';
import { TabsContext } from './TabsContext';

type TabsProps = {
    children: React.ReactNode;
    defaultValue: string;
};

export function TabsRoot({ children, defaultValue }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultValue);

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={styles.tabsRoot}>{children}</div>
        </TabsContext.Provider>
    );
}
