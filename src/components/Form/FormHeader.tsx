import styles from './styles.module.css';

type FormHeaderProps = {
    children: React.ReactNode;
} & React.ComponentProps<'div'>;

export function FormHeader({ children, ...props }: FormHeaderProps) {
    return (
        <section className={styles.formHeader} {...props}>
            {children}
        </section>
    );
}
