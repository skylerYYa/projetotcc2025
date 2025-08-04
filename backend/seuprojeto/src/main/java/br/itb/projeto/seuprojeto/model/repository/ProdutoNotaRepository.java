package br.itb.projeto.seuprojeto.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.seuprojeto.model.entity.Produto;
import br.itb.projeto.seuprojeto.model.entity.ProdutoNota;

@Repository
public interface ProdutoNotaRepository extends JpaRepository<ProdutoNota, Long> {

	Optional<ProdutoNota> findByProduto(Optional<Produto> produto);

}
