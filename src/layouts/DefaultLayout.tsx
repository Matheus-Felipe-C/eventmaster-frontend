import { Outlet } from 'react-router';
import { Header } from '../components/Header';

import styles from './styles.module.css';

export function DefaultLayout() {
    return (
        <>
            <Header />
            <main className={styles.mainContent}>
                <Outlet />
            </main>
        </>
    );
}
