# StockPro - Estrutura Inicial do Projeto

## Estrutura de Pastas

src/
│
├── app/
│ ├── components/ # Componentes reutilizáveis
│ ├── services/ # Conexões com a API e integração com banco de dados
│ ├── layouts/ # Layouts gerais (Dashboard, Login, etc.)
│ ├── pages/
│ │ ├── index.tsx # Página inicial
│ │ ├── dashboard.tsx # Página do Dashboard
│ │ ├── products.tsx # Página de Produtos
│ │ ├── suppliers.tsx # Página de Fornecedores
│ │ ├── stock.tsx # Página de Controle de Estoque
│ │ └── reports.tsx # Página de Relatórios
│ │
│ └── api/
│ ├── auth/
│ │ └── route.ts # Rotas de autenticação (NextAuth)
│ ├── products/
│ │ ├── create.ts # Criação de produtos
│ │ ├── update.ts # Atualização de produtos
│ │ └── delete.ts # Remoção de produtos
│ ├── suppliers/
│ │ ├── create.ts # Criação de fornecedores
│ │ ├── update.ts # Atualização de fornecedores
│ │ └── delete.ts # Remoção de fornecedores
│ └── stock/
│ ├── add.ts # Adicionar ao estoque
│ ├── remove.ts # Remover do estoque
│ └── list.ts # Listar estoque
│
├── prisma/
│ ├── schema.prisma # Schema do Prisma para definição das tabelas
│ └── migrations/ # Migrations do Prisma
│
├── public/
│ └── assets/ # Imagens e arquivos estáticos
│
├── styles/
│ └── globals.css # Estilização global
│
├── utils/
│ └── format.ts # Funções utilitárias
│
├── .env # Variáveis de ambiente
├── docker-compose.yml # Docker para containerização
├── Dockerfile # Dockerfile para configuração do ambiente
├── package.json # Dependências do projeto
└── tsconfig.json # Configurações do TypeScript

// -----------------------------------------------------------

## Prisma Schema - Definição das tabelas do banco de dados

generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}

model Product {
id Int @id @default(autoincrement())
name String
description String?
price Float
quantity Int
supplierId Int?
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

Supplier Supplier? @relation(fields: [supplierId], references: [id])
StockMovement StockMovement[]
}

model Supplier {
id Int @id @default(autoincrement())
name String
email String?
phone String?
address String?
products Product[]
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}

model StockMovement {
id Int @id @default(autoincrement())
productId Int
type String // "in" para entrada, "out" para saída
quantity Int
date DateTime @default(now())

Product Product @relation(fields: [productId], references: [id])
}
