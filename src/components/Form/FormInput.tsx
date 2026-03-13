import { useState, type HTMLInputTypeAttribute } from 'react';
import styles from './styles.module.css';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

type FormInputProps = {
    type?: HTMLInputTypeAttribute;
    label: string;
    icon?: React.ReactNode;
} & React.ComponentProps<'input'>;

export function FormInput({
    label,
    icon,
    id,
    required,
    className,
    type = 'text',
    ...props
}: FormInputProps) {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

    const [visible, setVisible] = useState<boolean>(false);
    if (type === 'password') {
        const isEyeVisibleDictionary = {
            true: EyeIcon,
            false: EyeOffIcon,
        };

        const EyeComponent =
            isEyeVisibleDictionary[String(visible) as 'true' | 'false'];

        return (
            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor={inputId}>
                    {label} {required && '*'}
                </label>
                <div className={icon ? styles.inputWrapper : ''}>
                    <div style={{ position: 'relative' }}>
                        {icon && <div className={styles.inputIcon}>{icon}</div>}
                        <input
                            id={inputId}
                            type={visible ? 'text' : 'password'}
                            {...props}
                            className={`${styles.formInput} ${icon ? styles.formInputWithIcon : ''} ${className ? styles.formInputWithoutIcon : ''}`}
                        />
                        <button
                            style={{ position: 'absolute' }}
                            type="button"
                            className={styles.eyeButton}
                            onClick={() => setVisible((v) => !v)}
                            tabIndex={-1}
                            aria-label={
                                visible ? 'Ocultar senha' : 'Mostrar senha'
                            }
                        >
                            <EyeComponent size={20} />
                        </button>
                    </div>
                </div>
            </div>
        );
    } else
        return (
            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor={inputId}>
                    {label} {required && '*'}
                </label>
                <div className={icon ? styles.inputWrapper : ''}>
                    {icon && <div className={styles.inputIcon}>{icon}</div>}
                    <input
                        id={inputId}
                        required={required}
                        className={`${styles.formInput} ${icon ? styles.formInputWithIcon : ''} ${className || ''}`}
                        {...props}
                    />
                </div>
            </div>
        );
}
