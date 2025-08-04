package br.itb.projeto.seuprojeto.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "ProdutoNota")
public class ProdutoNota {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
    private LocalDateTime dataAtualizacao;

    @ManyToOne
    @JoinColumn(name = "produto_id")
    private Produto produto;
    
	private double nota;
    private String statusProdutoNota;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public LocalDateTime getDataAtualizacao() {
		return dataAtualizacao;
	}

	public void setDataAtualizacao(LocalDateTime dataAtualizacao) {
		this.dataAtualizacao = dataAtualizacao;
	}

	public Produto getProduto() {
		return produto;
	}

	public void setProduto(Produto produto) {
		this.produto = produto;
	}

	public double getNota() {
		return nota;
	}

	public void setNota(double nota) {
		this.nota = nota;
	}

	public String getStatusProdutoNota() {
		return statusProdutoNota;
	}

	public void setStatusProdutoNota(String statusProdutoNota) {
		this.statusProdutoNota = statusProdutoNota;
	}

}









