package br.itb.projeto.cdmprojeto.rest.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.itb.projeto.cdmprojeto.model.entity.Usuario;
import br.itb.projeto.cdmprojeto.rest.exception.ResourceNotFoundException;
import br.itb.projeto.cdmprojeto.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

	private final UsuarioService usuarioService;

	public UsuarioController(UsuarioService usuarioService) {
		this.usuarioService = usuarioService;
	}

	@GetMapping("/findAll")
	public ResponseEntity<List<Usuario>> findAll() {
		List<Usuario> usuarios = usuarioService.findAll();
		return new ResponseEntity<>(usuarios, HttpStatus.OK);
	}

	@PostMapping("/save")
	public ResponseEntity<?> save(@RequestBody Usuario usuario) {
	    Usuario _usuario = usuarioService.save(usuario);
	    if (_usuario != null) {
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

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteUsuario(@PathVariable long id) {
		boolean deleted = usuarioService.deleteUsuario(id);
		if (deleted) {
			return ResponseEntity.ok().build();
		}
		throw new ResourceNotFoundException("Usuário não encontrado para deletar!");
	}

	@PutMapping("/ativar/{id}")
	public ResponseEntity<Usuario> ativarUsuario(@PathVariable long id) {
		Usuario usuario = usuarioService.mudarStatusUsuario(id, "ATIVO");
		if (usuario != null) {
			return ResponseEntity.ok(usuario);
		}
		throw new ResourceNotFoundException("Usuário não encontrado para ativar!");
	}

	@PutMapping("/inativar/{id}")
	public ResponseEntity<Usuario> inativarUsuario(@PathVariable long id) {
		Usuario usuario = usuarioService.mudarStatusUsuario(id, "INATIVO");
		if (usuario != null) {
			return ResponseEntity.ok(usuario);
		}
		throw new ResourceNotFoundException("Usuário não encontrado para inativar!");
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
		try {
			Usuario usuarioAtualizado = usuarioService.atualizarUsuario(id, usuario);
			return ResponseEntity.ok(usuarioAtualizado);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		} catch (ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
}