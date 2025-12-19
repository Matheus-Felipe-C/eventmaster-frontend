import styles from './styles.module.css';

type TabsListProps = {
    children: React.ReactNode;
};

export function TabsList({ children }: TabsListProps) {
    return <div className={styles.tabsList}>{children}</div>;
}
