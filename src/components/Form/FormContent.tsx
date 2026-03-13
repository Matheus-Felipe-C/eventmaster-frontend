import styles from './styles.module.css';

type FormProps = {
    children: React.ReactNode;
} & React.ComponentProps<'form'>;

export function FormContent({ children, ...props }: FormProps) {
    return (
        <div className={styles.formContent}>
            <form className={styles.form} {...props}>
                {children}
            </form>
        </div>
    );
}
