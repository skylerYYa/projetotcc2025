package br.itb.projeto.cdmprojeto.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.itb.projeto.cdmprojeto.model.entity.Formulario;
import br.itb.projeto.cdmprojeto.model.repository.FormularioRepository;
import br.itb.projeto.cdmprojeto.rest.exception.ResourceNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class FormularioService {

	private FormularioRepository formularioRepository;

	public FormularioService(FormularioRepository formularioRepository) {
		super();
		this.formularioRepository = formularioRepository;
	}

	public Formulario findById(long id) {
		Optional<Formulario> formulario = formularioRepository.findById(id);
		if(formulario.isPresent()) {
			return formulario.get();
		}
		return null;
	}
	
	public List<Formulario> findAll() {
		List<Formulario> formularios = formularioRepository.findAll();
		return formularios;
	}
	
	@Transactional
	public Formulario save(Formulario formulario) {
		
		formulario.setDataCadastro(LocalDateTime.now());
		formulario.setStatusFormulario("ATIVO");
		
		return formularioRepository.save(formulario);
	}

	@Transactional
	public Formulario atualizarFormulario(long id, Formulario formulario) {
		Optional<Formulario> formularioOpt = formularioRepository.findById(id);
		if (!formularioOpt.isPresent()) {
			throw new ResourceNotFoundException("Usuário não encontrado");
		}

		Formulario formularioExistente = formularioOpt.get();
		formularioExistente.setTurno(formulario.getTurno());
		formularioExistente.setFrequenciaRefeicao(formulario.getFrequenciaRefeicao());
		formularioExistente.setPratosAgradaveis(formulario.getPratosAgradaveis());
		formularioExistente.setPratosMenos(formulario.getPratosMenos());
        formularioExistente.setRestricoes(formulario.getRestricoes());
        formularioExistente.setFrequenciaSobremesa(formulario.getFrequenciaSobremesa());
        formularioExistente.setFrequenciaCafe(formulario.getFrequenciaCafe());
        formularioExistente.setDataCadastro(LocalDateTime.now());
        formularioExistente.setStatusFormulario(formulario.getStatusFormulario());
    
        return formularioRepository.save(formularioExistente);

	}

}




















