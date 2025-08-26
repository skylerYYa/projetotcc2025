package br.itb.projeto.seuprojeto.rest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.itb.projeto.seuprojeto.model.entity.ProdutoNota;
import br.itb.projeto.seuprojeto.rest.response.MessageResponse;
import br.itb.projeto.seuprojeto.service.ProdutoNotaService;

@RestController
@RequestMapping("/nota")
public class ProdutoNotaController {
	
	private ProdutoNotaService produtoNotaService;

	public ProdutoNotaController(ProdutoNotaService produtoNotaService) {
		super();
		this.produtoNotaService = produtoNotaService;
	}
	
	@PutMapping("/atualizarNota/{id}")
	public ResponseEntity<?> avaliar(@PathVariable long id) {
		
		ProdutoNota _produtoNota = produtoNotaService.atualizaNota(id);
		
		return ResponseEntity.ok()
				.body(new MessageResponse("Nota atualizada com sucesso!"));
	}
	

	
	

}
