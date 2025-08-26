package br.itb.projeto.seuprojeto.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.itb.projeto.seuprojeto.model.entity.Avaliacao;
import br.itb.projeto.seuprojeto.model.entity.Produto;
import br.itb.projeto.seuprojeto.model.entity.ProdutoNota;
import br.itb.projeto.seuprojeto.model.repository.AvaliacaoRepository;
import br.itb.projeto.seuprojeto.model.repository.ProdutoNotaRepository;
import br.itb.projeto.seuprojeto.model.repository.ProdutoRepository;
import jakarta.transaction.Transactional;

@Service
public class ProdutoNotaService {
	
	private ProdutoNotaRepository produtoNotaRepository;
	private AvaliacaoRepository avaliacaoRepository;
	private ProdutoRepository produtoRepository;

	public ProdutoNotaService(ProdutoNotaRepository produtoNotaRepository, AvaliacaoRepository avaliacaoRepository,
			ProdutoRepository produtoRepository) {
		super();
		this.produtoNotaRepository = produtoNotaRepository;
		this.avaliacaoRepository = avaliacaoRepository;
		this.produtoRepository = produtoRepository;
	}

	public ProdutoNota findByProduto(long id) {

		Optional<Produto> produto = produtoRepository.findById(id);

		if (produto.isPresent()) {
			ProdutoNota produtoNota = produtoNotaRepository.findByProduto(produto).get();	
			return produtoNota;
		}
		return null;
	}
	
	@Transactional
	public ProdutoNota atualizaNota(long produto_id) {

		Optional<Produto> produto = produtoRepository.findById(produto_id);

		if (produto.isPresent()) {
			List<Avaliacao> avaliacoes = avaliacaoRepository.findByProdutoAndStatusAvaliacao(produto, "ATIVO");
			Optional<ProdutoNota> produtoNota = produtoNotaRepository.findByProduto(produto);
			
			double media = avaliacoes.stream()
                       .mapToDouble(Avaliacao::getNota)
                       .average()
                       .orElse(0.0);
			
			ProdutoNota produtoNotaAtualizada = produtoNota.get();
			produtoNotaAtualizada.setNota(media);
			produtoNotaAtualizada.setDataAtualizacao(LocalDateTime.now());
			
			return produtoNotaRepository.save(produtoNotaAtualizada);
		}
		return null;
	}
	
	public ProdutoNota findById(long id) {

		Optional<ProdutoNota> produtoNota = produtoNotaRepository.findById(id);

		if (produtoNota.isPresent()) {
			return produtoNota.get();
		}
		return null;
	}
	

}





