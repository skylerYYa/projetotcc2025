package br.itb.projeto.seuprojeto.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.seuprojeto.model.entity.Promocao;

@Repository
public interface PromocaoRepository extends JpaRepository<Promocao, Long> {

	List<Promocao> findByStatusPromocao(String string);

}
