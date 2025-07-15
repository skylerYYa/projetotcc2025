package br.itb.projeto.cdmprojeto.rest.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import br.itb.projeto.cdmprojeto.model.entity.Refeicao;
import br.itb.projeto.cdmprojeto.service.RefeicaoService;

@RestController
@RequestMapping("/api/refeicoes")
@CrossOrigin(origins = "http://localhost:3000")
public class RefeicaoController {

    @Autowired
    private RefeicaoService refeicaoService;

    @GetMapping
    public List<Refeicao> listarTodas() {
        return refeicaoService.listarTodas();
    }

    @GetMapping("/{id}")
    public Optional<Refeicao> buscarPorId(@PathVariable Long id) {
        return refeicaoService.buscarPorId(id);
    }

    @GetMapping("/dia/{diaSemana}")
    public List<Refeicao> listarPorDia(@PathVariable String diaSemana) {
        return refeicaoService.listarPorDia(diaSemana);
    }

    @GetMapping("/periodo/{periodo}")
    public List<Refeicao> listarPorPeriodo(@PathVariable String periodo) {
        return refeicaoService.listarPorPeriodo(periodo);
    }

    @PostMapping
    public Refeicao cadastrar(@RequestBody Refeicao refeicao) {
        return refeicaoService.salvar(refeicao);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        refeicaoService.deletar(id);
    }
}