# MovieFlix API

API robusta desenvolvida para o gerenciamento de um catálogo de filmes, permitindo operações completas de CRUD (Criação, Leitura, Atualização e Exclusão) e filtragem avançada por gêneros.

## 🚀 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução Javascript.
- **Express**: Framework web para construção de APIs.
- **Prisma ORM**: Manipulação e modelagem do banco de dados.
- **TypeScript**: Superset Javascript para desenvolvimento com tipagem estática.
- **Swagger UI**: Documentação interativa da API.

## 🛠️ Requisitos

- Node.js (v12 ou superior)
- Gerenciador de pacotes (NPM ou Yarn)
- Banco de dados compatível com Prisma (configurado via `.env`)

## 🔧 Instalação e Execução

1.  **Instale as dependências:**

    ```bash
    npm install
    ```

2.  **Configuração do Banco de Dados:**
    Certifique-se de que a URL do seu banco de dados está configurada corretamente no arquivo `.env`. Em seguida, execute as migrações:

    ```bash
    npx prisma migrate dev
    ```

3.  **Compilação e Início:**
    ```bash
    npm run build
    npm start
    ```
    A API estará disponível em `http://localhost:3000`.

## 📖 Documentação da API

A documentação interativa detalhada (Swagger) pode ser acessada em tempo de execução através da rota:
👉 `http://localhost:3000/docs`

### Endpoints Principais

#### Filmes

- **`GET /movies`**: Retorna a lista de todos os filmes ordenados alfabeticamente por título. Inclui detalhes de gêneros e idiomas.
- **`POST /movies`**: Cadastra um novo filme.
  - _Regra de Negócio_: Não é permitido cadastrar filmes com títulos duplicados (case-insensitive).
- **`PUT /movies/:id`**: Atualiza os dados de um filme existente baseado no ID fornecido.
- **`DELETE /movies/:id`**: Remove um filme do catálogo.
- **`GET /movies/:genreName`**: Filtra e retorna filmes baseados no nome do gênero informado na URL.

### Estrutura do Objeto (Movie)

| Campo          | Tipo       | Descrição                      |
| :------------- | :--------- | :----------------------------- |
| `title`        | String     | Título do filme (Obrigatório)  |
| `genre_id`     | Integer    | ID de referência ao gênero     |
| `language_id`  | Integer    | ID de referência ao idioma     |
| `oscar_count`  | Integer    | Quantidade de Oscars recebidos |
| `release_date` | Date (ISO) | Data de lançamento do filme    |

## 📂 Estrutura do Projeto

- `src/`: Contém o código-fonte da aplicação.
- `dist/`: Arquivos compilados para produção.
- `prisma/`: Esquemas e migrações do banco de dados.
- `swagger.json`: Definições da documentação OpenAPI.

## 🛡️ Tratamento de Erros

A API está preparada para retornar códigos de status HTTP semânticos:

- `200/201`: Sucesso.
- `400`: Requisição inválida ou recurso não encontrado.
- `404`: Filme não encontrado.
- `409`: Conflito (ex: título duplicado).
- `500`: Erro interno do servidor.

---

_Desenvolvido como parte do ecossistema MovieFlix._
