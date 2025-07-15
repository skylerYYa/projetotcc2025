package br.itb.projeto.cdmprojeto.rest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.itb.projeto.cdmprojeto.model.entity.Mensagem;
import br.itb.projeto.cdmprojeto.rest.exception.ResourceNotFoundException;
import br.itb.projeto.cdmprojeto.service.MensagemService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/mensagem")
@CrossOrigin(origins = "http://localhost:3000")
public class MensagemController {

	private MensagemService mensagemService;

	// Source -> Generate Constructor using Fields...
	public MensagemController(MensagemService mensagemService) {
		super();
		this.mensagemService = mensagemService;
	}

	@GetMapping("/test")
	public String getTest() {
		return "Olá, Mensagem!";
	}

	@GetMapping("/findById/{id}")
	public ResponseEntity<Mensagem> findById(@PathVariable long id) {
		Mensagem mensagem = mensagemService.findById(id);
		if (mensagem != null) {
			return new ResponseEntity<Mensagem>(mensagem, HttpStatus.OK);
		} else {
			throw new ResourceNotFoundException("Mensagem não encontrada!");
		}
	}

	@GetMapping("/findAll")
	public ResponseEntity<List<Mensagem>> findAll() {

		List<Mensagem> mensagens = mensagemService.findAll();

		return new ResponseEntity<List<Mensagem>>(mensagens, HttpStatus.OK);

	}

	@PostMapping("/save")
	public ResponseEntity<?> save(@RequestBody Mensagem mensagem) {
		Mensagem _mensagem = mensagemService.save(mensagem);
		return ResponseEntity.ok().body("Mensagem enviada com sucesso!");
	}

}
