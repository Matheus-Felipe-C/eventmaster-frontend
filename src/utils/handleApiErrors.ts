import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import type { apiResponseError } from '../server/apiResponse';

/**
 * Mapeia erros da API para campos do formulário usando react-hook-form
 * @param apiErrors - Objeto de erros retornado pela API
 * @param setError - Função setError do react-hook-form
 * @param fieldMap - Mapeamento de nomes de campos da API para nomes do formulário
 */
export function handleApiErrors<T extends FieldValues>(
    apiErrors: apiResponseError['errors'],
    setError: UseFormSetError<T>,
    fieldMap: Record<string, Path<T>>
) {
    if (!apiErrors) return;

    Object.keys(apiErrors).forEach((fieldName) => {
        const messages = apiErrors[fieldName];
        if (messages && messages.length > 0) {
            const formFieldName = fieldMap[fieldName];
            if (formFieldName) {
                setError(formFieldName, {
                    type: 'manual',
                    message: messages[0],
                });
            }
        }
    });
}
