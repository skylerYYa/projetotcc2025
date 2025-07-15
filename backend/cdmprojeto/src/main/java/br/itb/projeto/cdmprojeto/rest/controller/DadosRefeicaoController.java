package br.itb.projeto.cdmprojeto.rest.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import br.itb.projeto.cdmprojeto.model.entity.DadosRefeicao;
import br.itb.projeto.cdmprojeto.service.DadosRefeicaoService;

@RestController
@RequestMapping("/api/dados-refeicao")
@CrossOrigin(origins = "http://localhost:3000")
public class DadosRefeicaoController {

    @Autowired
    private DadosRefeicaoService service;

    @GetMapping
    public List<DadosRefeicao> listarTodas() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    public Optional<DadosRefeicao> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @GetMapping("/refeicao/{refeicaoId}")
    public List<DadosRefeicao> buscarPorRefeicao(@PathVariable Long refeicaoId) {
        return service.buscarPorRefeicao(refeicaoId);
    }

    @GetMapping("/status/{status}")
    public List<DadosRefeicao> buscarPorStatus(@PathVariable String status) {
        return service.buscarPorStatus(status);
    }

    @PostMapping
    public DadosRefeicao cadastrar(@RequestBody DadosRefeicao dados) {
        return service.salvar(dados);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}