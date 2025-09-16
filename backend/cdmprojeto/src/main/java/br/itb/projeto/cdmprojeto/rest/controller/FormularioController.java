package br.itb.projeto.cdmprojeto.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.itb.projeto.cdmprojeto.model.entity.Formulario;
import br.itb.projeto.cdmprojeto.rest.exception.ResourceNotFoundException;
import br.itb.projeto.cdmprojeto.service.FormularioService;

@RestController
@RequestMapping("/formulario")
public class FormularioController {

    @Autowired
    private FormularioService formularioService;

    @GetMapping("/findAll")
    public ResponseEntity<List<Formulario>> listarTodos() {
    	List<Formulario> formularios = formularioService.findAll();
		return new ResponseEntity<List<Formulario>>(formularios, HttpStatus.OK);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Formulario> buscarPorId(@PathVariable Integer id) {
    	Formulario formulario = formularioService.findById(id);	
    	return new ResponseEntity<Formulario>(formulario, HttpStatus.OK);
    }
    
	@PostMapping("/save")
	public ResponseEntity<?> save(@RequestBody Formulario formulario) {
		Formulario _formulario = formularioService.save(formulario);
		return ResponseEntity.ok().body("Formulario enviado com sucesso!");
	}

    
	@PutMapping("/editar/{id}")
	public ResponseEntity<?> atualizarFormulario(@PathVariable long id, @RequestBody Formulario formulario) {
		try {
			Formulario formularioAtualizado = formularioService.atualizarFormulario(id, formulario);
			return ResponseEntity.ok(formularioAtualizado);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		} catch (ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}

}
