import { useContext } from 'react';
import styles from './styles.module.css';
import { TabsContext } from './TabsContext';

type TabsContentProps = {
    children: React.ReactNode;
    value: string;
};

export function TabsContent({ children, value }: TabsContentProps) {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabsContent must be used within Tabs');

    const { activeTab } = context;
    if (activeTab !== value) return null;

    return (
        <div
            role="tabpanel"
            data-state={activeTab === value ? 'active' : 'inactive'}
            className={styles.tabsContent}
        >
            {children}
        </div>
    );
}
