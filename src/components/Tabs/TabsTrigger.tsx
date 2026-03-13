import { useContext } from 'react';
import styles from './styles.module.css';
import { TabsContext } from './TabsContext';

type TabsTriggerProps = {
    children: React.ReactNode;
    value: string;
    onClick?: () => void;
};

export function TabsTrigger({ children, value, onClick }: TabsTriggerProps) {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabsTrigger must be used within Tabs');

    const { activeTab, setActiveTab } = context;
    const isActive = activeTab === value;

    const handleClick = () => {
        setActiveTab(value);
        onClick?.();
    };

    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
            data-state={isActive ? 'active' : 'inactive'}
            className={`${styles.tabsTrigger} ${isActive ? styles.tabsTriggerActive : ''}`}
            onClick={handleClick}
        >
            {children}
        </button>
    );
}
