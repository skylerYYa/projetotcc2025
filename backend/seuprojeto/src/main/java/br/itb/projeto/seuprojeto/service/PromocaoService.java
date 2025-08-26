package br.itb.projeto.seuprojeto.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.itb.projeto.seuprojeto.model.entity.Promocao;
import br.itb.projeto.seuprojeto.model.repository.PromocaoRepository;
import br.itb.projeto.seuprojeto.model.repository.UsuarioRepository;
import jakarta.transaction.Transactional;

@Service
public class PromocaoService {

	private PromocaoRepository promocaoRepository;
	private UsuarioRepository usuarioRepository;

	public PromocaoService(PromocaoRepository promocaoRepository, UsuarioRepository usuarioRepository) {
		super();
		this.promocaoRepository = promocaoRepository;
		this.usuarioRepository = usuarioRepository;
	}

	public Promocao findById(long id) {
		Optional<Promocao> promocao = promocaoRepository.findById(id);
		if (promocao.isPresent()) {
			return promocao.get();
		}
		return null;
	}

	public List<Promocao> findAll() {
		List<Promocao> promocoes = promocaoRepository.findAll();
		return promocoes;
	}

	public List<Promocao> findAllAtivos(){
		List<Promocao> promocoes = promocaoRepository.findByStatusPromocao("ATIVO");
		return promocoes;
	}
	
	@Transactional
	public Promocao create(Promocao promocao) {
		
		promocao.setDataCadastro(LocalDateTime.now());
		promocao.setStatusPromocao("ATIVO");
		
		return promocaoRepository.save(promocao);
	}
	
	@Transactional
	public Promocao alterar(MultipartFile file, long id, Promocao promocao) {
		Optional<Promocao> _promocao = promocaoRepository.findById(id);

		if (_promocao.isPresent()) {
			
			Promocao promocaoAtualizada = _promocao.get();
			promocaoAtualizada.setNome(promocao.getNome());
			promocaoAtualizada.setInfo(promocao.getInfo());
	
			if (file != null && file.getSize() > 0) {
				try {
					promocaoAtualizada.setFoto(file.getBytes());
				} catch (IOException e) {
					e.printStackTrace();
				}
			} 

			return promocaoRepository.save(promocaoAtualizada);
		}
		return null;
	}
	
	@Transactional
	public Promocao createComFoto(MultipartFile file, Promocao promocao) {
		
		if (file != null && file.getSize() > 0) {
			try {
				promocao.setFoto(file.getBytes());
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			promocao.setFoto(null);
		}
		promocao.setDataCadastro(LocalDateTime.now());
		promocao.setStatusPromocao("ATIVO");
		
		return promocaoRepository.save(promocao);
	}
	
	@Transactional
	public Promocao inativar(long id) {
		
		Optional<Promocao> _promocao = promocaoRepository.findById(id);
		
		if (_promocao.isPresent()) {
			Promocao promocao = _promocao.get();
			promocao.setDataCadastro(LocalDateTime.now());
			promocao.setStatusPromocao("INATIVO");
			
			return promocaoRepository.save(promocao);
		}

		return null;
	}
}
