import styles from './styles.module.css';

type FormTitleProps = {
    children: React.ReactNode;
};

type FormSubtitleProps = {
    children: React.ReactNode;
};

export function FormTitle({ children }: FormTitleProps) {
    return <h4 className={styles.formTitle}>{children}</h4>;
}

export function FormSubtitle({ children }: FormSubtitleProps) {
    return <p className={styles.formSubtitle}>{children}</p>;
}
