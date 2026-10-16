-- Script de criacao do banco de dados - Fan Store (loja de roupas de time)
-- Uso (opcional): mysql -u root -p < database/init.sql
-- O backend tambem cria/atualiza estas tabelas sozinho (spring.jpa.hibernate.ddl-auto=update)
-- e insere os produtos de exemplo na primeira execucao (DataInitializer).

CREATE DATABASE IF NOT EXISTS loja_time
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE loja_time;

CREATE TABLE IF NOT EXISTS clientes (
  id        BIGINT       NOT NULL AUTO_INCREMENT,
  nome      VARCHAR(255) NOT NULL,
  email     VARCHAR(255) NOT NULL,
  senha     VARCHAR(255) NOT NULL,
  telefone  VARCHAR(255),
  endereco  VARCHAR(255),
  cidade    VARCHAR(255),
  estado    VARCHAR(255),
  cep       VARCHAR(255),
  PRIMARY KEY (id),
  CONSTRAINT uk_clientes_email UNIQUE (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS produtos (
  id         BIGINT       NOT NULL AUTO_INCREMENT,
  nome       VARCHAR(255) NOT NULL,
  descricao  VARCHAR(255),
  preco      DOUBLE       NOT NULL,
  imagem     VARCHAR(255),
  time       VARCHAR(255) NOT NULL,
  categoria  VARCHAR(255),
  tamanhos   VARCHAR(255),
  ativo      BIT,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS pedidos (
  id           BIGINT       NOT NULL AUTO_INCREMENT,
  cliente_id   BIGINT,
  data_pedido  DATETIME(6),
  status       VARCHAR(255),
  total        DOUBLE,
  PRIMARY KEY (id),
  CONSTRAINT fk_pedidos_cliente FOREIGN KEY (cliente_id) REFERENCES clientes (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS itens_pedido (
  id              BIGINT       NOT NULL AUTO_INCREMENT,
  pedido_id       BIGINT,
  produto_id      BIGINT,
  quantidade      INT,
  tamanho         VARCHAR(255),
  preco_unitario  DOUBLE,
  PRIMARY KEY (id),
  CONSTRAINT fk_itens_pedido  FOREIGN KEY (pedido_id)  REFERENCES pedidos (id),
  CONSTRAINT fk_itens_produto FOREIGN KEY (produto_id) REFERENCES produtos (id)
) ENGINE=InnoDB;
