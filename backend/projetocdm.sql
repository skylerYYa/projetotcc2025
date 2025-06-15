USE master IF EXISTS( SELECT * FROM SYS.databases WHERE name = 'projetocdm')

DROP DATABASE projetocdm
GO
CREATE DATABASE projetocdm
GO

USE projetocdm

CREATE TABLE Usuario (
    Id              INT                          IDENTITY PRIMARY KEY,
    Nome            VARCHAR(100)                 NOT NULL,
    Email           VARCHAR(100)                 UNIQUE NOT NULL,
    Senha           VARCHAR(255)                 NOT NULL,
    Cargo           VARCHAR(50)                  NOT NULL CHECK (Cargo IN ('ADM', 'Developer', 'Estudante','Diretor(a)','Coordenador(a)')),
    Permissao       VARCHAR(50)                  NOT NULL CHECK (Permissao IN ('Visualizar', 'Editar', 'Gerenciar')), 
    StatusConta     VARCHAR(20)                  DEFAULT 'Ativo' CHECK (StatusConta IN ('Ativo', 'Inativo')), 
    DataCriacao     DATETIME DEFAULT GETDATE()   NOT NULL,
    DataAtualizacao DATETIME DEFAULT GETDATE()   NOT NULL
);



CREATE TABLE Acesso (
    Id           INT       IDENTITY,
    UsuarioId    INT       NOT NULL,
    Dataacesso   DATETIME  NOT NULL,

    FOREIGN KEY (UsuarioId) REFERENCES Usuario(Id)
);

CREATE TABLE Refeicao (
    Id              INT IDENTITY PRIMARY KEY,
    DiaSemana       VARCHAR(20) NOT NULL CHECK (DiaSemana IN ('Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira')),
    Periodo         VARCHAR(20) NOT NULL CHECK (Periodo IN ('Manhã', 'Tarde', 'Noite')),
    Refeicao        VARCHAR(100) NOT NULL, 
    AlunosPresentes INT NOT NULL,
    AlunosComeram   INT NOT NULL,
    Repeticoes      INT NOT NULL, 
    PratosServidos  INT NOT NULL, 
    DataRegistro    DATETIME DEFAULT GETDATE() NOT NULL
);

CREATE TABLE Relatorio (
    Id              INT IDENTITY PRIMARY KEY,
    DiaSemana       VARCHAR(20) NOT NULL CHECK (DiaSemana IN ('Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira')),
    MediaManha      INT NOT NULL, 
    MediaTarde      INT NOT NULL,
    MediaNoite      INT NOT NULL, 
    MediaTotalDia   INT NOT NULL, 
    DataGeracao     DATETIME DEFAULT GETDATE() NOT NULL
);

SELECT*FROM Relatorio
SELECT*FROM Refeicao
SELECT*FROM Usuario
SELECT*FROM Acesso
