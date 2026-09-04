# Nest API

API REST desenvolvida com [NestJS](https://nestjs.com/), TypeORM e PostgreSQL, para gerenciamento de cursos (`courses`) e suas respectivas tags (`tags`), com relacionamento muitos-para-muitos.

## Sumário

- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Endpoints](#endpoints)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Rodando manualmente (sem Docker)](#rodando-manualmente-sem-docker)
- [Rodando com Docker](#rodando-com-docker)
- [Migrations](#migrations)
- [Testes](#testes)

## Tecnologias

- [NestJS 11](https://nestjs.com/)
- [TypeORM](https://typeorm.io/) + [PostgreSQL](https://www.postgresql.org/)
- [class-validator](https://github.com/typestack/class-validator) / [class-transformer](https://github.com/typestack/class-transformer) para validação de DTOs
- [Jest](https://jestjs.io/) para testes unitários e e2e
- Docker / Docker Compose

## Estrutura do projeto

```
src/
  app.module.ts          # Módulo raiz (ConfigModule, TypeOrmModule, CoursesModule)
  config/
    typeorm.config.ts    # DataSource usado pela CLI do TypeORM (migrations)
  courses/
    courses.controller.ts
    courses.service.ts
    dto/                 # CreateCourseDto / UpdateCourseDto
    entities/             # Course e Tag (relação ManyToMany via courses_tags)
  migrations/             # Migrations do TypeORM
```

## Endpoints

Base path: `/courses`

| Método | Rota            | Descrição                   |
| ------ | --------------- | --------------------------- |
| GET    | `/courses/list` | Lista todos os cursos       |
| GET    | `/courses/:id`  | Busca um curso pelo id      |
| POST   | `/courses`      | Cria um novo curso          |
| PATCH  | `/courses/:id`  | Atualiza um curso existente |
| DELETE | `/courses/:id`  | Remove um curso             |

O corpo de criação (`CreateCourseDto`) espera:

```json
{
  "name": "Nome do curso",
  "description": "Descrição opcional",
  "tags": [{ "name": "nestjs" }]
}
```

## Variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e preencha os valores:

```
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

# pgAdmin (opcional)
PGADMIN_EMAIL=admin@admin.com
PGADMIN_PASSWORD=admin

# Porta da aplicação
PORT=3000
```

> Ao rodar via Docker Compose, `DB_HOST` deve ser o nome do serviço do banco (`nest-db`). Ao rodar localmente sem Docker, use `localhost`.

## Rodando manualmente (sem Docker)

Pré-requisitos: Node.js 22+, um PostgreSQL acessível (local ou remoto) e npm.

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure o `.env` (veja [Variáveis de ambiente](#variáveis-de-ambiente)), apontando `DB_HOST` para o seu Postgres local (ex.: `localhost`).
3. Rode as migrations:
   ```bash
   npm run migration:run
   ```
4. Inicie a aplicação em modo desenvolvimento (hot reload):
   ```bash
   npm run start:dev
   ```
   Ou em modo produção:
   ```bash
   npm run build
   npm run start:prod
   ```

A API ficará disponível em `http://localhost:3000` (ou na porta definida em `PORT`).

## Rodando com Docker

Pré-requisitos: Docker e Docker Compose.

1. Configure o `.env` na raiz do projeto (use `DB_HOST=nest-db` para apontar ao container do banco).
2. Suba os containers:
   ```bash
   docker compose up --build
   ```
   Isso vai:
   - construir a imagem da aplicação (`Dockerfile`) e subir o container `nest-app`;
   - subir o container do PostgreSQL (`nest-db`), aguardando o healthcheck do banco;
   - via `.docker/entrypoint.sh`, instalar dependências, buildar o projeto, rodar as migrations e iniciar a aplicação em modo watch (`npm run start:dev`).
3. A API estará disponível em `http://localhost:3000`.
4. Para parar os containers:
   ```bash
   docker compose down
   ```
   Adicione `-v` para remover também o volume de dados do Postgres (`dbdata`).

> Há um serviço `pgadmin` comentado no `docker-compose.yml` que pode ser habilitado para administrar o banco visualmente (porta `8000`).

## Migrations

Comandos disponíveis via TypeORM CLI (usam `src/config/typeorm.config.ts`):

```bash
# Criar uma migration vazia
npm run migration:create --name=NomeDaMigration

# Gerar uma migration a partir das entidades
npm run migration:generate --name=NomeDaMigration

# Rodar migrations pendentes
npm run migration:run

# Reverter a última migration
npm run migration:revert
```

## Testes

```bash
# Testes unitários
npm run test

# Testes unitários em modo watch
npm run test:watch

# Cobertura de testes
npm run test:cov

# Testes e2e
npm run test:e2e
```
