package br.itb.projeto.cdmprojeto.model.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Formulario")
public class Formulario {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    private String turno;
    private String frequenciaRefeicao;
    private String pratosAgradaveis;
    private String pratosMenos;
    private String restricoes;
    private String frequenciaSobremesa;
    private String frequenciaCafe;
    private LocalDateTime dataCadastro;
    private String statusFormulario;
    
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	public String getTurno() {
		return turno;
	}
	public void setTurno(String turno) {
		this.turno = turno;
	}
	public String getFrequenciaRefeicao() {
		return frequenciaRefeicao;
	}
	public void setFrequenciaRefeicao(String frequenciaRefeicao) {
		this.frequenciaRefeicao = frequenciaRefeicao;
	}
	public String getPratosAgradaveis() {
		return pratosAgradaveis;
	}
	public void setPratosAgradaveis(String pratosAgradaveis) {
		this.pratosAgradaveis = pratosAgradaveis;
	}
	public String getPratosMenos() {
		return pratosMenos;
	}
	public void setPratosMenos(String pratosMenos) {
		this.pratosMenos = pratosMenos;
	}
	public String getRestricoes() {
		return restricoes;
	}
	public void setRestricoes(String restricoes) {
		this.restricoes = restricoes;
	}
	public String getFrequenciaSobremesa() {
		return frequenciaSobremesa;
	}
	public void setFrequenciaSobremesa(String frequenciaSobremesa) {
		this.frequenciaSobremesa = frequenciaSobremesa;
	}
	public String getFrequenciaCafe() {
		return frequenciaCafe;
	}
	public void setFrequenciaCafe(String frequenciaCafe) {
		this.frequenciaCafe = frequenciaCafe;
	}
	public LocalDateTime getDataCadastro() {
		return dataCadastro;
	}
	public void setDataCadastro(LocalDateTime dataCadastro) {
		this.dataCadastro = dataCadastro;
	}
	public String getStatusFormulario() {
		return statusFormulario;
	}
	public void setStatusFormulario(String statusFormulario) {
		this.statusFormulario = statusFormulario;
	}

 
}
