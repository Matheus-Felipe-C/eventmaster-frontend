import styles from './styles.module.css';

type FormSendButtonProps = {
    children: React.ReactNode;
} & React.ComponentProps<'button'>;

export function FormSendButton({
    children,
    className,
    ...props
}: FormSendButtonProps) {
    return (
        <button
            type="submit"
            className={`${styles.formButton} ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    );
}
