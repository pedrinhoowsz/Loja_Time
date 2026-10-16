# Fan Store - Loja Virtual de Roupas de Time

Projeto completo de loja virtual com **Angular** (frontend), **Spring Boot** (backend API REST) e **MySQL** (banco de dados).

## Tema

Loja de roupas de time com paleta verde, dourado e preto — inspirada em clubes de futebol.

## Estrutura do Projeto

```
loja/
├── backend/          # API REST Spring Boot
├── frontend/         # Angular + Bootstrap
└── database/         # Script SQL de referência
```

## APIs Implementadas

Todos os métodos abaixo estão implementados nos services do frontend.

### Cliente
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/clientes` | Gravar Cliente |
| PUT | `/api/clientes/{id}` | Alterar Cliente |
| GET | `/api/clientes/{id}` | Consultar Cliente |
| GET | `/api/clientes/email/{email}` | Consultar por Email |
| POST | `/api/clientes/login` | Fazer Login |
| POST | `/api/clientes/redefinir-senha` | Redefinir Senha |

### Produto
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/produtos/vitrine` | Carregar Vitrine |
| GET | `/api/produtos/busca?termo=` | Fazer Busca |
| GET | `/api/produtos/{id}` | Carregar um Produto |

### Pedido
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/pedidos` | Gravar Pedido |

## Telas do Frontend (estrutura do "modelo")

```
frontend/src/app/
├── model/            Cliente, Produto, ItemCesta, Pedido
├── service/          cliente-service, produto-service, pedido-service, cesta-service, auth-service
├── barrabusca/       Barra de busca (cabeçalho)
├── vitrine/          Vitrine de produtos            (rota /vitrine e /)
├── resultado-busca/  Resultado da busca             (rota /resultado-busca?termo=)
├── detalhe/          Detalhe do produto + comprar   (rota /detalhe/:id)
├── cesta/            Cesta e finalizar pedido       (rota /cesta)
├── pedido/           Confirmação do pedido          (rota /pedido)
├── login/            Login                          (rota /login)
├── cadastro/         Novo cadastro / Meus dados     (rota /cadastro)
└── reenvio/          Esqueci minha senha            (rota /reenvio)
```

O layout é responsivo (Bootstrap 5): menu recolhível, grade de produtos de 2/3/4 colunas e cesta em cartões no celular.

## Pré-requisitos

- Java 17+
- Maven 3.8+
- Node.js 18+
- MySQL 8+ (ou use o perfil H2)

## Banco de dados

**Opção 1 – MySQL (padrão)**

1. Suba um MySQL 8 (instalado, ou `docker compose up -d` na raiz do projeto).
2. Ajuste usuário/senha em `backend/src/main/resources/application.properties`
   ou use as variáveis de ambiente `DB_URL`, `DB_USER` e `DB_PASSWORD`.
3. (Opcional) crie as tabelas manualmente: `mysql -u root -p < database/init.sql`.
   O Hibernate também cria/atualiza as tabelas sozinho (`ddl-auto=update`).

**Opção 2 – H2, sem instalar nada**

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=h2
```

Os dados ficam em `backend/data/`; console em `http://localhost:8082/h2-console`.

## Como Executar

### Backend

```bash
cd backend
mvn spring-boot:run
```

API disponível em: `http://localhost:8082`

### Frontend

```bash
cd frontend
npm install
npm start
```

Aplicação disponível em: `http://localhost:4200`

## Fluxo de Uso

1. Acesse a vitrine e navegue pelos produtos
2. Clique em um produto para ver detalhes
3. Selecione tamanho e adicione à cesta
4. Crie uma conta em **Cadastro** ou faça **Login**
5. Na cesta, finalize o pedido

## Produtos de Exemplo

O backend insere automaticamente camisas e acessórios de times (Palmeiras, Corinthians, Flamengo) na primeira execução.
