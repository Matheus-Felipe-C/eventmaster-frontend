import { FormSendButton } from './FormButton';
import { FormContent } from './FormContent';
import { FormHeader } from './FormHeader';
import { FormInput } from './FormInput';
import { FormSubtitle, FormTitle } from './FormText';
import styles from './styles.module.css';

Form.Header = FormHeader; //HEADER ENCAPSULA 'TITLE' E 'SUBTITLE' CASO EXISTAM
Form.Title = FormTitle;
Form.Subtitle = FormSubtitle;
Form.Content = FormContent;
Form.Input = FormInput;
Form.SendButton = FormSendButton;

type FormContainerProps = {
    children: React.ReactNode;
} & React.ComponentProps<'div'>;

export function Form({ children, className, ...props }: FormContainerProps) {
    return (
        <div className={`${styles.formCard} ${className}`} {...props}>
            <div className={styles.formContainer}>{children}</div>
        </div>
    );
}
