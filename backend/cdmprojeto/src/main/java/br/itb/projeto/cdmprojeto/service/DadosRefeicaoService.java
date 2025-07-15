package br.itb.projeto.cdmprojeto.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.itb.projeto.cdmprojeto.model.entity.DadosRefeicao;
import br.itb.projeto.cdmprojeto.model.repository.DadosRefeicaoRepository;

@Service
public class DadosRefeicaoService {

    @Autowired
    private DadosRefeicaoRepository repository;

    public List<DadosRefeicao> listarTodas() {
        return repository.findAll();
    }

    public Optional<DadosRefeicao> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public List<DadosRefeicao> buscarPorRefeicao(Long refeicaoId) {
        return repository.findByRefeicao_Id(refeicaoId);
    }

    public List<DadosRefeicao> buscarPorStatus(String status) {
        return repository.findByStatusRefeicao(status);
    }

    public DadosRefeicao salvar(DadosRefeicao dados) {
        return repository.save(dados);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}