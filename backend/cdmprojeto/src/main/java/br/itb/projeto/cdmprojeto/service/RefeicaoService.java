package br.itb.projeto.cdmprojeto.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.itb.projeto.cdmprojeto.model.entity.Refeicao;
import br.itb.projeto.cdmprojeto.model.repository.RefeicaoRepository;

@Service
public class RefeicaoService {

    @Autowired
    private RefeicaoRepository refeicaoRepository;

    public List<Refeicao> listarTodas() {
        return refeicaoRepository.findAll();
    }

    public List<Refeicao> listarPorDia(String diaSemana) {
        return refeicaoRepository.findByDiaSemana(diaSemana);
    }

    public List<Refeicao> listarPorPeriodo(String periodo) {
        return refeicaoRepository.findByPeriodo(periodo);
    }

    public Optional<Refeicao> buscarPorId(Long id) {
        return refeicaoRepository.findById(id);
    }

    public Refeicao salvar(Refeicao refeicao) {
        return refeicaoRepository.save(refeicao);
    }

    public void deletar(Long id) {
        refeicaoRepository.deleteById(id);
    }
}