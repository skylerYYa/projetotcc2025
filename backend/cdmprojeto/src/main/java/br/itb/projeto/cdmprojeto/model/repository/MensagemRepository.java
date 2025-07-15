package br.itb.projeto.cdmprojeto.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.cdmprojeto.model.entity.Mensagem;

@Repository
public interface MensagemRepository 
					extends JpaRepository<Mensagem, Long> {

}
