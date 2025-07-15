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

	@Transactional
	public Usuario login(String email, String senha) {

		Usuario _usuario = usuarioRepository.findByEmail(email);

		if (_usuario != null) {
			if (_usuario.getStatusUsuario().equals("ATIVO")) {
				byte[] decodedPass = Base64.getDecoder()
											.decode(_usuario.getSenha());

				if (new String(decodedPass).equals(senha)) {
					return _usuario;
				}
			}
		}
		return null;
	}

}






