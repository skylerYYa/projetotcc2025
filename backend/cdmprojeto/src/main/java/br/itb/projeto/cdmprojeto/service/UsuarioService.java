package br.itb.projeto.cdmprojeto.service;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.itb.projeto.cdmprojeto.model.entity.Usuario;
import br.itb.projeto.cdmprojeto.model.repository.UsuarioRepository;
import jakarta.transaction.Transactional;

@Service
public class UsuarioService {

	private UsuarioRepository usuarioRepository;

	// Source -> Generate Constructor using Fields...
	public UsuarioService(UsuarioRepository usuarioRepository) {
		super();
		this.usuarioRepository = usuarioRepository;
	}

	public Usuario findById(long id) {
		Optional<Usuario> usuario = usuarioRepository.findById(id);
		if (usuario.isPresent()) {
			return usuario.get();
		}
		return null;
	}

	public List<Usuario> findAll() {
		List<Usuario> usuarios = usuarioRepository.findAll();
		return usuarios;
	}


	@Transactional
	public boolean deleteUsuario(long id) {
		Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
		if (usuarioOpt.isPresent()) {
			usuarioRepository.deleteById(id);
			return true;
		}
		return false;
	}

	@Transactional
	public Usuario mudarStatusUsuario(long id, String novoStatus) {
		Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
		if (usuarioOpt.isPresent()) {
			Usuario usuario = usuarioOpt.get();
			usuario.setStatusUsuario(novoStatus);
			return usuarioRepository.save(usuario);
		}
		return null;
	}

	public Usuario save(Usuario usuario) {
		Usuario _usuario = usuarioRepository.findByEmail(usuario.getEmail());

		if (_usuario == null) {

			String senha = Base64.getEncoder()
									.encodeToString(usuario.getSenha().getBytes());

			usuario.setSenha(senha);
			usuario.setDataCadastro(LocalDateTime.now());
			usuario.setStatusUsuario("ATIVO");

			return usuarioRepository.save(usuario);
		}
		return null;
	}

	public Usuario login(String email, String senha) {
		// TODO Auto-generated method stub
		return null;
	}
}