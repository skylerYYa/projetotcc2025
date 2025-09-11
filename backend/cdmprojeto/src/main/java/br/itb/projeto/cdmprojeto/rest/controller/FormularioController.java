package br.itb.projeto.cdmprojeto.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/formulario")
public class FormularioController {

    @Autowired
    private FormularioRepository formularioRepository;

    @GetMapping
    public List<Formulario> listarTodos() {
        return formularioRepository.findAll();
    }

    @GetMapping("/{id}")
    public Formulario buscarPorId(@PathVariable Integer id) {
        return formularioRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Formulario criar(@RequestBody Formulario formulario) {
        formulario.setDataCadastro(java.time.LocalDateTime.now());
        return formularioRepository.save(formulario);
    }

    @PutMapping("/{id}")
    public Formulario atualizar(@PathVariable Integer id, @RequestBody Formulario formularioAtualizado) {
        return formularioRepository.findById(id).map(formulario -> {
            formulario.setTurno(formularioAtualizado.getTurno());
            formulario.setFrequenciaResfeicao(formularioAtualizado.getFrequenciaResfeicao());
            formulario.setPratosAgradaveis(formularioAtualizado.getPratosAgradaveis());
            formulario.setPratosMenos(formularioAtualizado.getPratosMenos());
            formulario.setRestricoes(formularioAtualizado.getRestricoes());
            formulario.setFrutasDieta(formularioAtualizado.getFrutasDieta());
            formulario.setRotinaDiaria(formularioAtualizado.getRotinaDiaria());
            formulario.setStatusQuestao(formularioAtualizado.getStatusQuestao());
            return formularioRepository.save(formulario);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Integer id) {
        formularioRepository.deleteById(id);
    }
}
