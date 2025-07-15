package br.itb.projeto.cdmprojeto.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.cdmprojeto.model.entity.Refeicao;

@Repository
public interface RefeicaoRepository extends JpaRepository<Refeicao, Long> {
    List<Refeicao> findByDiaSemana(String diaSemana);
    List<Refeicao> findByPeriodo(String periodo);
    List<Refeicao> findByDiaSemanaAndPeriodo(String diaSemana, String periodo);
}