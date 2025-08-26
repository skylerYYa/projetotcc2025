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
public class AvaliacaoService {

	private AvaliacaoRepository avaliacaoRepository;
	private ProdutoRepository produtoRepository;
	private ProdutoNotaRepository produtoNotaRepository;

	public AvaliacaoService(AvaliacaoRepository avaliacaoRepository, ProdutoRepository produtoRepository,
			ProdutoNotaRepository produtoNotaRepository) {
		super();
		this.avaliacaoRepository = avaliacaoRepository;
		this.produtoRepository = produtoRepository;
		this.produtoNotaRepository = produtoNotaRepository;
	}

	public List<Avaliacao> listarAvaliacoesProduto(long id) {

		Optional<Produto> produto = produtoRepository.findById(id);

		if (produto.isPresent()) {
			List<Avaliacao> avaliacoes = avaliacaoRepository.findByProduto(produto);
			return avaliacoes;
		}
		return null;
	}
	@Transactional
	public Avaliacao avaliar(Avaliacao avaliacao, long produto_id) {

		Optional<Produto> produto = produtoRepository.findById(produto_id);

		if (produto.isPresent()) {

			Optional<ProdutoNota> nota = produtoNotaRepository.findByProduto(produto);
			
			avaliacao.setProduto(produto.get());
			avaliacao.setDataCadastro(LocalDateTime.now());
			avaliacao.setStatusAvaliacao("ATIVO");

			Avaliacao avalicao = avaliacaoRepository.save(avaliacao);
			
			// SE O PRODUTO NÃO TEM NENHUMA AVALIAÇÃO
			// ELE AINDA NÃO TEM NOTA, AQUI SERÁ INSERIDA A PRIMEIRA NOTA
			if (!nota.isPresent()) {
				ProdutoNota _nota = new ProdutoNota();
				_nota.setDataAtualizacao(LocalDateTime.now());
				_nota.setProduto(produto.get());
				_nota.setNota(avaliacao.getNota());
				_nota.setStatusProdutoNota("ATIVO");
				produtoNotaRepository.save(_nota);
			}
			return avalicao;
		}
		return null;
	}

	public Avaliacao findById(long id) {

		Optional<Avaliacao> avaliacao = avaliacaoRepository.findById(id);

		if (avaliacao.isPresent()) {
			return avaliacao.get();
		}

		return null;
	}

	public List<Avaliacao> findAll(long id) {

		Optional<Produto> produto = produtoRepository.findById(id);

		if (produto.isPresent()) {
			List<Avaliacao> avaliacaos = avaliacaoRepository.findByProdutoAndStatusAvaliacao(produto, "ATIVO");
			return avaliacaos;
		}
		return null;
	}
}
