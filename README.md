# EventMaster Frontend

Sistema de gerenciamento de eventos - Interface Web

## 📋 Pré-requisitos

-   Node.js (versão 22 ou superior)
-   npm ou yarn
-   Git

## 🚀 Configuração Inicial

### 1. Clone o repositório

```bash
git clone <url-do-repositório>
cd eventmaster-frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (se necessário):

```env
VITE_API_URL=http://localhost:3000
```

### 4. Execute o projeto

```bash
npm run dev
```

## 🔄 Workflow de Desenvolvimento

### ⚠️ IMPORTANTE: Sempre após fazer pull

```bash
npm install
```

Sempre execute `npm install` após fazer pull de mudanças para garantir que todas as dependências estejam atualizadas.

### Criando uma nova branch

```bash
git checkout -b tipo/nome-da-branch
```

Tipos de branch:

-   `feat/` - Nova funcionalidade
-   `fix/` - Correção de bug
-   `chore/` - Tarefas de manutenção/configuração
-   `refactor/` - Refatoração de código
-   `docs/` - Documentação

## 📁 Estrutura do Projeto

```
src/
├── assets/          # Imagens, ícones, fontes
├── components/      # Componentes reutilizáveis
├── constants/       # Constantes do projeto (rotas, API, etc)
├── css/            # Estilos globais e variáveis CSS
├── layouts/        # Layouts de página
├── pages/          # Páginas da aplicação
├── routes/         # Configuração de rotas
├── server/         # Configuração de API
├── services/       # Serviços e integrações
├── types/          # Definições de tipos TypeScript
└── utils/          # Funções utilitárias
```

## 📝 Padrões de Código

### 1. Uso de Constantes

**SEMPRE** utilize as constantes definidas em `src/constants/`:

✅ **Correto:**

```tsx
import { PageRoutesName } from '@/constants/PageRoutesName';
import { apiRoutesName } from '@/constants/apiRoutesName';

navigate(PageRoutesName.HOME);
api.get(apiRoutesName.events);
```

❌ **Incorreto:**

```tsx
navigate('/home'); // NÃO use strings hardcoded
api.get('/api/events'); // NÃO use URLs hardcoded
```

### 2. Rotas

-   Use o sistema de rotas configurado em `src/routes/`
-   Todas as rotas de páginas devem estar em `PageRoutesName.ts`
-   Todas as rotas de API devem estar em `apiRoutesName.ts`

### 3. Componentes

-   Um componente por arquivo
-   Use `index.tsx` como arquivo principal do componente
-   CSS Modules para estilos: `styles.module.css`
-   Estrutura de pasta:
    ```
    ComponentName/
    ├── index.tsx
    └── styles.module.css
    ```

### 4. Tipagem

-   **SEMPRE** tipifique suas variáveis, funções e props
-   Defina tipos em `src/types/` quando reutilizáveis

```tsx
type ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button ({ label, onClick, disabled = false }: ButtonProps) => {
  // ...
}
```

### 5. Importações

-   Use importações absolutas quando possível
-   Organize as importações:
    1. Bibliotecas externas
    2. Componentes internos
    3. Constantes, tipos e utils
    4. Estilos

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from '@/components/Header';

import { PageRoutesName } from '@/constants/PageRoutesName';
import type { User } from '@/types/User';

import styles from './styles.module.css';
```

### 6. CSS

-   Use CSS Modules para componentes
-   Variáveis CSS globais em `src/css/variables.css`
-   Nomes de classes em camelCase no CSS Module

```css
/* styles.module.css */
.containerMain {
    padding: var(--spacing-md);
}

.buttonPrimary {
    background: var(--color-primary);
}
```

## 🛠️ Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build de produção
npm run lint         # Executa o linter
```

## 🔌 Extensões Recomendadas (VS Code)

O projeto já está configurado com extensões recomendadas. Ao abrir no VS Code, aceite instalar as extensões sugeridas:

-   ESLint
-   Prettier
-   CSS Modules
-   CSS Variables
-   Trailing Spaces

## ✨ Formatação Automática

O projeto está configurado para formatar automaticamente ao salvar:

-   Prettier para formatação geral
-   ESLint para correções automáticas

**Configurações em `.vscode/settings.json`**

## 🐛 Troubleshooting

### Erro de dependências

```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro de cache do Vite

```bash
rm -rf node_modules/.vite
npm run dev
```

### Porta já em uso

Altere a porta no `vite.config.ts` ou pare o processo que está usando a porta 5173.

## 📚 Recursos

-   [Documentação React](https://react.dev/)
-   [Documentação TypeScript](https://www.typescriptlang.org/)
-   [Documentação Vite](https://vitejs.dev/)
-   [Documentação React Router](https://reactrouter.com/)
