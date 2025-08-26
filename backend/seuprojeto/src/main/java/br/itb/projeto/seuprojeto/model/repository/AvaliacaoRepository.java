package br.itb.projeto.seuprojeto.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.seuprojeto.model.entity.Avaliacao;
import br.itb.projeto.seuprojeto.model.entity.Produto;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

	List<Avaliacao> findByProduto(Optional<Produto> produto);

	List<Avaliacao> findByProdutoAndStatusAvaliacao(Optional<Produto> produto, String statusAvaliacao);
}
