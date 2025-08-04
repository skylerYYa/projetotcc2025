package br.itb.projeto.seuprojeto.rest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.itb.projeto.seuprojeto.model.entity.Promocao;
import br.itb.projeto.seuprojeto.rest.response.MessageResponse;
import br.itb.projeto.seuprojeto.service.PromocaoService;

@RestController
@RequestMapping("/promocao")
public class PromocaoController {

	private PromocaoService promocaoService;
	// Source -> Generate Constructor using Fields...
	public PromocaoController(PromocaoService promocaoService) {
		super();
		this.promocaoService = promocaoService;
	}
		
	@GetMapping("/findAll")
	public ResponseEntity<List<Promocao>> findAll(){
		
		List<Promocao> promocoes = promocaoService.findAll();
		
		return new ResponseEntity<List<Promocao>>(promocoes, HttpStatus.OK);
		
	}
	
	@GetMapping("/findAllAtivos")
	public ResponseEntity<List<Promocao>> findAllAtivos() {
		List<Promocao> promocoes = promocaoService.findAllAtivos();

		return new ResponseEntity<List<Promocao>>(promocoes, HttpStatus.OK);
	}
	
	@GetMapping("/findById/{id}")
	public ResponseEntity<?> findById(@PathVariable long id) {

		Promocao promocao = promocaoService.findById(id);

		if (promocao != null) {
			return new ResponseEntity<Promocao>(promocao, HttpStatus.OK);
		} 
		return ResponseEntity.badRequest()
				.body(new MessageResponse("*** Promoção não encontrada! *** "));
	}
		
	@PostMapping("/create")
	public ResponseEntity<?> create(
			@RequestParam(required = false) MultipartFile file,
			@ModelAttribute Promocao promocao) {

		promocaoService.createComFoto(file, promocao);

		return ResponseEntity.ok()
				.body(new MessageResponse("Promoção cadastrada com sucesso!"));
	}
	
	@PutMapping("alterar/{id}")
	public ResponseEntity<?> alterar(@PathVariable long id,
			@RequestParam(required = false) MultipartFile file,
			@ModelAttribute Promocao promocao) {

		promocaoService.alterar(file, id, promocao);

		return ResponseEntity.ok()
				.body(new MessageResponse("Promoção alterada com sucesso!"));
	}
	
	@PutMapping("inativar/{id}")
	public ResponseEntity<?> inativar(@PathVariable long id) {

		promocaoService.inativar(id);

		return ResponseEntity.ok()
				.body(new MessageResponse("Promoção inativada com sucesso!"));
	}

}








