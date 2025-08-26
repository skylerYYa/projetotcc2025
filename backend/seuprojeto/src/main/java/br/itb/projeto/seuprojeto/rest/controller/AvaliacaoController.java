package br.itb.projeto.seuprojeto.rest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.itb.projeto.seuprojeto.model.entity.Avaliacao;
import br.itb.projeto.seuprojeto.rest.response.MessageResponse;
import br.itb.projeto.seuprojeto.service.AvaliacaoService;

@RestController
@RequestMapping("/avaliacao")
public class AvaliacaoController {
	
	private AvaliacaoService avaliacaoService;

	public AvaliacaoController(AvaliacaoService avaliacaoService) {
		super();
		this.avaliacaoService = avaliacaoService;
	}
	
	@PostMapping("/avaliar/{id}")
	public ResponseEntity<?> avaliar(@RequestBody Avaliacao avaliacao, @PathVariable long id) {
		
		Avaliacao _avaliacao = avaliacaoService.avaliar(avaliacao, id);
		
		return ResponseEntity.ok()
				.body(new MessageResponse("Avaliacao enviada com sucesso!"));
	}
	
	@GetMapping("/findAll/{id}")
	public ResponseEntity<List<Avaliacao>> findAll(@PathVariable long id){
		
		List<Avaliacao> avaliacoes = avaliacaoService.findAll(id);
		
		return new ResponseEntity<List<Avaliacao>>(avaliacoes, HttpStatus.OK);
		
	}
	
	

}
