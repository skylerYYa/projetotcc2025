USE master IF EXISTS(select * from sys.databases where name='bd_projetocdm') 
DROP DATABASE bd_projetocdm
GO 
-- CRIAR UM BANCO DE DADOS
CREATE DATABASE bd_projetocdm
GO
-- ACESSAR O BANCO DE DADOS
USE bd_projetocdm
GO

CREATE TABLE Usuario
( 
   id            INT			IDENTITY,
   nome          VARCHAR(100)	NOT NULL,
   email         VARCHAR(100)	UNIQUE NOT NULL,
   senha         VARCHAR(100)	NOT NULL,
   nivelAcesso   VARCHAR(10)    NULL, -- ADMIN ou FUNCIONARIO ou ALUNO
   foto			 VARBINARY(MAX) NULL,
   dataCadastro	 SMALLDATETIME	NOT NULL,
   statusUsuario VARCHAR(20)    NOT NULL, -- ATIVO ou INATIVO ou TROCAR_SENHA

   PRIMARY KEY (id)
)
GO
INSERT Usuario (nome, email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES ('Fulano da Silva', 'fulano@email.com.br', 'MTIzNDU2Nzg=', 'ADMIN', NULL, GETDATE(), 'ATIVO')
INSERT Usuario (nome, email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES ('Beltrana de Sa', 'beltrana@email.com.br', 'MTIzNDU2Nzg=', 'USER', NULL, GETDATE(), 'ATIVO')
INSERT Usuario (nome, email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES ('Sicrana de Oliveira', 'sicrana@email.com.br', 'MTIzNDU2Nzg=', 'USER', NULL, GETDATE(), 'INATIVO')
INSERT Usuario (nome, email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES ('Ordnael Zurc', 'ordnael@email.com.br', 'MTIzNDU2Nzg=', 'USER', NULL, GETDATE(), 'TROCAR_SENHA')
GO

CREATE TABLE Refeicao 
(
    id              INT IDENTITY,
    diaSemana       VARCHAR(20) NOT NULL CHECK (DiaSemana IN ('Segunda-feira', 'Terca-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira')),
    periodo         VARCHAR(20) NOT NULL CHECK (Periodo IN ('Manha', 'Tarde', 'Noite')),
    nomeRefeicao    VARCHAR(100) NOT NULL, 
	composicao      VARCHAR(300) NOT NULL, 
	usuario_id		INT	NOT NULL,
    dataCadastro    DATETIME NOT NULL,

	statusRefeicao  VARCHAR(20)   NOT NULL, -- ATIVO ou SERVIDO ou INATIVO

	PRIMARY KEY (id),
	FOREIGN KEY (usuario_id) REFERENCES Usuario (id)
);

CREATE TABLE DadosRefeicao 
(
    id              INT IDENTITY,
    alunosPresentes INT NOT NULL,
    alunosComeram   INT NOT NULL,
    porcoesServidas INT NOT NULL, 
	usuario_id		INT	NOT NULL,
    dataCadastro    DATETIME    NOT NULL,
	refeicao_id		INT			    NULL,
	statusRefeicao  VARCHAR(20) NOT NULL, -- ATIVO ou INATIVO

	PRIMARY KEY (id),
	FOREIGN KEY (usuario_id) REFERENCES Usuario (id),
	FOREIGN KEY (refeicao_id) REFERENCES Refeicao (id)
);

CREATE TABLE Questao 
(
    id              INT IDENTITY,
    enunciado       VARCHAR(200) NOT NULL,
	tipo			VARCHAR(100) NOT NULL,
	altA			VARCHAR(100) NULL,
	altB			VARCHAR(100) NULL,
	altC			VARCHAR(100) NULL,
	altD			VARCHAR(100) NULL,
	altE			VARCHAR(100) NULL,
    dataCadastro    DATETIME NOT NULL,

	statusQuestao  VARCHAR(20)   NOT NULL, -- ATIVO ou INATIVO

	PRIMARY KEY (id)
);

CREATE TABLE Resposta 
(
    id              INT IDENTITY,
	usuario_id		INT	NOT NULL,
	questao_id		INT	NOT NULL,
	resposta		VARCHAR(200) NOT NULL,
	dataCadastro    DATETIME     NOT NULL,
	statusResposta  VARCHAR(20)  NOT NULL, -- ATIVO ou INATIVO

	PRIMARY KEY (id),
	FOREIGN KEY (usuario_id) REFERENCES Usuario (id)
);

CREATE TABLE Mensagem
(
	id	            INT			  IDENTITY,
	dataMensagem    SMALLDATETIME NOT NULL,
	emissor			VARCHAR(100)  NOT NULL,
	email 	        VARCHAR(100)  NOT NULL,
	telefone	    VARCHAR(20)       NULL,
	texto 	        VARCHAR(400)  NOT NULL,
	statusMensagem  VARCHAR(10)   NOT NULL, -- ATIVO ou INATIVO

	PRIMARY KEY (id)
)
GO
INSERT Mensagem (dataMensagem, emissor, email, telefone, texto, statusMensagem) 
VALUES (GETDATE(), 'Ordnael Zurc', 'ordnael@email.com', '(11) 98765-4123', 'Mensagem de teste', 'ATIVO')
INSERT Mensagem (dataMensagem, emissor, email, telefone, texto, statusMensagem) 
VALUES (GETDATE(), 'Maria Onete', 'maria@email.com', null, 'Segunda mensagem de teste', 'ATIVO')
GO


SELECT * FROM Usuario
SELECT * FROM Mensagem
SELECT * FROM DadosRefeicao
SELECT * FROM Refeicao


/* VERIFICAR CONEX�ES EXISTENTES */
/*
SELECT * FROM sys.dm_exec_sessions
WHERE database_id = DB_ID('bd_pizzaria_3d')
AND host_name IS NOT NULL
AND program_name LIKE 'Microsoft SQL Server Management Studio%'
*/