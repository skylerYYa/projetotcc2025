package br.itb.projeto.cdmprojeto.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.cdmprojeto.model.entity.DadosRefeicao;

@Repository
public interface DadosRefeicaoRepository extends JpaRepository<DadosRefeicao, Long> {
    List<DadosRefeicao> findByRefeicao_Id(Long refeicaoId);
    List<DadosRefeicao> findByStatusRefeicao(String statusRefeicao);
}