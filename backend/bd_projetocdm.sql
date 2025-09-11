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
   rm          VARCHAR(10)	 NULL,
   nome          VARCHAR(100)	NOT NULL,
      dataNascimento	DATE	NOT NULL,
   email         VARCHAR(100)	UNIQUE NOT NULL,
   senha         VARCHAR(100)	NOT NULL,
   nivelAcesso   VARCHAR(20)    NULL, -- ADMIN ou FUNCIONARIO ou ALUNO
   foto			 VARBINARY(MAX) NULL,
   dataCadastro	 SMALLDATETIME	NOT NULL,
   statusUsuario VARCHAR(20)    NOT NULL, -- ATIVO ou INATIVO ou TROCAR_SENHA

   PRIMARY KEY (id)
)
GO
INSERT Usuario (rm, nome, dataNascimento, email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES (null, 'Fulano da Silva','09/04/1989', 'fulano@email.com.br', 'MTIzNDU2Nzg=', 'ADMIN', NULL, GETDATE(), 'ATIVO')
INSERT Usuario (rm, nome, dataNascimento,  email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES (null,'Beltrana de Sa','22/08/2009', 'beltrana@email.com.br', 'MTIzNDU2Nzg=', 'FUNCIONARIO', NULL, GETDATE(), 'ATIVO')
INSERT Usuario (rm, nome, dataNascimento,  email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES ('89937','Juliana Machado', '12/10/2000', 'sicrana@email.com.br', 'MjkxMDIwMDc=', 'ALUNO', NULL, GETDATE(), 'ATIVO')
INSERT Usuario (rm, nome, dataNascimento,  email, senha, nivelAcesso, foto, dataCadastro, statusUsuario)
VALUES ('89976','Luiciano Pereira','10/09/1987', 'ordnael@email.com.br', 'MjIwOTIwMDc=', 'ALUNO', NULL, GETDATE(), 'ATIVO')

GO
DELETE FROM Usuario WHERE ID =6;

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


