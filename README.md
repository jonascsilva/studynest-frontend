# Links

## Repositório com a documentação

- https://github.com/jonascsilva/portfolio

---

# StudyNest-Frontend

Este repositório contém o código do frontend da aplicação StudyNest, que é uma aplicação de gerênciamente de flashcards com um algoritmo de repetição espaçada.

## Tecnologias Utilizadas

- **Linguagens e Frameworks**

  - [React](https://react.dev) para a construção da interface de usuário.
  - [Vite](https://vite.dev) como ferramenta de build e desenvolvimento.
  - [TypeScript](https://typescriptlang.org) para tipagem estática e desenvolvimento seguro.

- **Gerenciamento de Estado e Dados**

  - [@tanstack/react-query](https://tanstack.com/query) para gerenciamento eficiente de dados assíncronos.
  - [@tanstack/react-router](https://tanstack.com/router) para roteamento avançado dentro da aplicação.

- **Estilização e UI**

  - [Chakra UI](https://chakra-ui.com) para componentes de interface acessíveis e personalizáveis.
  - [Sass](https://sass-lang.com) para pré-processamento de CSS.

- **Validação e Formulários**

  - [react-hook-form](https://react-hook-form.com) para gerenciamento de formulários de forma eficiente.
  - [Zod](https://zod.dev) para validação de esquemas de dados.

- **Ferramentas de Desenvolvimento**
  - [ESLint](https://eslint.org) para análise estática de código e manutenção de padrões.
  - [Prettier](https://prettier.io) para formatação consistente de código.
  - [Stylelint](https://stylelint.io) para linting de CSS/Sass.
  - [Vitest](https://vitest.dev) para testes unitários e de integração.

## Pré-requisitos

- [Node.js](https://nodejs.org) versão 20
- [Docker](https://docker.com) (opcional, para ambiente de desenvolvimento via Docker)

## Como Executar

### Instalação das Dependências

Utilizando o npm, execute o seguinte comando no diretório do projeto:

```bash
npm install
```

### Executar em Ambiente de Desenvolvimento

#### Usando Node.js

Inicie o servidor de desenvolvimento com o comando:

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:5173](http://localhost:5173).

#### Usando Docker

Certifique-se de ter o Docker instalado e em execução. Depois execute o seguinte comando para iniciar o serviço frontend:

```bash
docker compose up
```

A aplicação estará acessível em [http://localhost:5173](http://localhost:5173).

### Compilar para Produção

Para compilar a aplicação para ambiente de produção, utilize:

```bash
npm run build
```

### Executar a Aplicação Compilada

Após a compilação, você pode visualizar a build de produção localmente com:

```bash
npm run preview
```

### Lint e Formatação

Para verificar o código com as ferramentas de linting e formatação, execute:

```bash
npm run lint
```

Para corrigir automaticamente os problemas encontrados, utilize:

```bash
npm run lint-fix
```

### Executar Testes

Para rodar os testes unitários, utilize:

```bash
npm run test
```

Outros comandos de teste disponíveis:

- `test:watch`: Executa os testes em modo de observação.
- `test:cov`: Gera um relatório de cobertura de testes.
