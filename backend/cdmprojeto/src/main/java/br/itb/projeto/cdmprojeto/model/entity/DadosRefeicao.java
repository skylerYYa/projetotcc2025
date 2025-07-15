package br.itb.projeto.cdmprojeto.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "DadosRefeicao")
public class DadosRefeicao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int alunosPresentes;

    @Column(nullable = false)
    private int alunosComeram;

    @Column(nullable = false)
    private int porcoesServidas;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "refeicao_id")
    private Refeicao refeicao;

    @Column(nullable = false)
    private LocalDateTime dataCadastro;

    @Column(nullable = false)
    private String statusRefeicao;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public int getAlunosPresentes() {
        return alunosPresentes;
    }

    public void setAlunosPresentes(int alunosPresentes) {
        this.alunosPresentes = alunosPresentes;
    }

    public int getAlunosComeram() {
        return alunosComeram;
    }

    public void setAlunosComeram(int alunosComeram) {
        this.alunosComeram = alunosComeram;
    }

    public int getPorcoesServidas() {
        return porcoesServidas;
    }

    public void setPorcoesServidas(int porcoesServidas) {
        this.porcoesServidas = porcoesServidas;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Refeicao getRefeicao() {
        return refeicao;
    }

    public void setRefeicao(Refeicao refeicao) {
        this.refeicao = refeicao;
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