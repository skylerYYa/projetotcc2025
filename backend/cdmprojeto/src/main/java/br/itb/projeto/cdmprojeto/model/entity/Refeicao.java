package br.itb.projeto.cdmprojeto.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "Refeicao")
public class Refeicao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "diaSemana", nullable = false)
    private String diaSemana;

    @Column(name = "periodo", nullable = false)
    private String periodo;

    @Column(name = "nomeRefeicao", nullable = false)
    private String nomeRefeicao;

    @Column(name = "composicao", nullable = false, length = 300)
    private String composicao;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario; // usuário que cadastrou a refeição

    @Column(name = "dataCadastro", nullable = false)
    private LocalDateTime dataCadastro;

    @Column(name = "statusRefeicao", nullable = false)
    private String statusRefeicao;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public String getDiaSemana() {
        return diaSemana;
    }

    public void setDiaSemana(String diaSemana) {
        this.diaSemana = diaSemana;
    }

    public String getPeriodo() {
        return periodo;
    }

    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    public String getNomeRefeicao() {
        return nomeRefeicao;
    }

    public void setNomeRefeicao(String nomeRefeicao) {
        this.nomeRefeicao = nomeRefeicao;
    }

    public String getComposicao() {
        return composicao;
    }

    public void setComposicao(String composicao) {
        this.composicao = composicao;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public String getStatusRefeicao() {
        return statusRefeicao;
    }

    public void setStatusRefeicao(String statusRefeicao) {
        this.statusRefeicao = statusRefeicao;
    }
}