package br.itb.projeto.cdmprojeto.model.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Formulario")
public class Formulario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer usuarioId;

    private String turno;
    private String frequenciaResfeicao;
    private String pratosAgradaveis;
    private String pratosMenos;
    private String restricoes;
    private String frutasDieta;
    private String rotinaDiaria;

    @Column(nullable = false)
    private LocalDateTime dataCadastro;

    @Column(nullable = false)
    private String statusQuestao;

    // Getters e Setters
}
