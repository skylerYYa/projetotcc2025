package br.itb.projeto.cdmprojeto.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.itb.projeto.cdmprojeto.model.entity.Formulario;

public interface FormularioRepository extends JpaRepository<Formulario, Long> {
	
}

