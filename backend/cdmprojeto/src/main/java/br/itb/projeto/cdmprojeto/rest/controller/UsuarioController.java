package br.itb.projeto.cdmprojeto.rest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.itb.projeto.cdmprojeto.model.entity.Usuario;
import br.itb.projeto.cdmprojeto.rest.exception.ResourceNotFoundException;
import br.itb.projeto.cdmprojeto.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

	private UsuarioService usuarioService;

	// Source -> Generate Constructor using Fields...
	public UsuarioController(UsuarioService usuarioService) {
		super();
		this.usuarioService = usuarioService;
	}

	@GetMapping("/test")
	public String getTest() {
		return "Olá, Usuário!";
	}

	@GetMapping("/findById/{id}")
	public ResponseEntity<Usuario> findById(@PathVariable long id) {
		Usuario usuario = usuarioService.findById(id);
		if (usuario != null) {
			return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
		} else {
			throw new ResourceNotFoundException("Usuário não encontrado!");
		}
	}

	@GetMapping("/findAll")
	public ResponseEntity<List<Usuario>> findAll() {

		List<Usuario> usuarios = usuarioService.findAll();

		return new ResponseEntity<List<Usuario>>(usuarios, HttpStatus.OK);

	}

	@PostMapping("/save")
	public ResponseEntity<?> save(@RequestBody Usuario usuario) {

	    Usuario _usuario = usuarioService.save(usuario);

	    if (_usuario != null) {
	        // Retorna o objeto recém-criado com status 201
	        return ResponseEntity.status(HttpStatus.CREATED).body(_usuario);
	    } else {
	        throw new ResourceNotFoundException("Conta de usuário já cadastrada!");
	    }
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Usuario usuario) {

		Usuario _usuario = usuarioService.login(usuario.getEmail(), usuario.getSenha());

		if (_usuario != null) {
			return ResponseEntity.ok().body(_usuario);
		}
		throw new ResourceNotFoundException("Dados Incorretos!!!");

	}

}









