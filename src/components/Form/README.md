# Componente Form - Compound Component Pattern

Este é um componente de formulário genérico e reutilizável construído usando o padrão **Compound Component**.

## 📋 Estrutura

O componente Form é composto por vários sub-componentes que trabalham juntos:

- **Form**: Container principal do formulário (card)
- **Form.Title**: Título do formulário
- **Form.Subtitle**: Subtítulo/descrição do formulário
- **Form.Content**: Container do conteúdo (elemento `<form>` que recebe props como `onSubmit`)
- **Form.Input**: Campo de input com label integrado
- **Form.SendButton**: Botão de envio do formulário

### Exemplo com Ícones

```tsx
import { Form } from '@/components/Form';

function FormWithIcons() {
    const UserIcon = (
        <svg /* ... seu ícone SVG ... */>{/* paths do ícone */}</svg>
    );

    return (
        <Form>
            <Form.Title>Login</Form.Title>
            <Form.Subtitle>Entre com suas credenciais</Form.Subtitle>

            <Form.Content onSubmit={handleSubmit}>
                <Form.Input
                    label="Usuário"
                    type="text"
                    icon={UserIcon}
                    placeholder="seu-usuario"
                    required
                />

                <Form.SendButton>Entrar</Form.SendButton>
            </Form.Content>
        </Form>
    );
}
```

## 📦 Props

### Form

```typescript
type FormContainerProps = {
    children: ReactNode;
};
```

### Form.Title

```typescript
type FormTitleProps = {
    children: ReactNode;
};
```

### Form.Subtitle

```typescript
type FormSubtitleProps = {
    children: ReactNode;
};
```

### Form.Content

```typescript
type FormProps = {
    children: ReactNode;
    // Aceita todas as props de um elemento <form>, incluindo onSubmit
};
```

### Form.Input

```typescript
type FormInputProps {
    label: string; // Texto do label (obrigatório)
    icon?: ReactNode; // Ícone opcional (SVG ou componente)
    // Aceita todas as props de um elemento <input>
}
```

**Nota**: Se você passar `required`, o asterisco (\*) será adicionado automaticamente ao label.

### Form.SendButton

```typescript
type FormSendButtonProps {
    children: ReactNode;
    // Aceita todas as props de um elemento <button>
}
```
