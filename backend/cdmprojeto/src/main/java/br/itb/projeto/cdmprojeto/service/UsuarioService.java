package br.itb.projeto.cdmprojeto.service;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.itb.projeto.cdmprojeto.model.entity.Usuario;
import br.itb.projeto.cdmprojeto.model.repository.UsuarioRepository;
import br.itb.projeto.cdmprojeto.rest.exception.ResourceNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class UsuarioService {

	private final UsuarioRepository usuarioRepository;

	public UsuarioService(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}

	public Usuario findById(long id) {
		Optional<Usuario> usuario = usuarioRepository.findById(id);
		return usuario.orElse(null);
	}

	public List<Usuario> findAll() {
		return usuarioRepository.findAll();
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
			String senha = Base64.getEncoder().encodeToString(usuario.getSenha().getBytes());
			usuario.setSenha(senha);
			usuario.setDataCadastro(LocalDateTime.now());
			usuario.setStatusUsuario("ATIVO");
			return usuarioRepository.save(usuario);
		}
		return null;
	}

	@Transactional
	public Usuario login(String email, String senha) {
		Usuario usuario = usuarioRepository.findByEmail(email);

		if (usuario != null) {
			if (!usuario.getStatusUsuario().equals("INATIVO")) {
				byte[] decodedPass = Base64.getDecoder()
												.decode(usuario.getSenha());
				
				if (new String(decodedPass).equals(senha)) {
					return usuario;
				}
			}
		}
		return null;
	}
	
	@Transactional
	public Usuario loginMobile(String rm, String senha) {
		Usuario usuario = usuarioRepository.findByRm(rm);

		if (usuario != null) {
			if (!usuario.getStatusUsuario().equals("INATIVO")) {
				byte[] decodedPass = Base64.getDecoder()
												.decode(usuario.getSenha());
				
				if (new String(decodedPass).equals(senha)) {
					return usuario;
				}
			}
		}
		return null;
	}

	@Transactional
	public Usuario atualizarUsuario(Long id, Usuario usuarioAtualizado) {
		Optional<Usuario> usuarioOpt = usuarioRepository.findById(id);
		if (!usuarioOpt.isPresent()) {
			throw new ResourceNotFoundException("Usuário não encontrado");
		}

		Usuario usuarioExistente = usuarioOpt.get();

		// Checa se o novo e-mail já pertence a outro usuário
		Usuario usuarioComMesmoEmail = usuarioRepository.findByEmail(usuarioAtualizado.getEmail());
		if (usuarioComMesmoEmail != null && usuarioComMesmoEmail.getId() != id) {
			throw new IllegalArgumentException("E-mail já cadastrado em outro usuário!");
		}

		usuarioExistente.setNome(usuarioAtualizado.getNome());
		usuarioExistente.setEmail(usuarioAtualizado.getEmail());
		usuarioExistente.setNivelAcesso(usuarioAtualizado.getNivelAcesso());
		usuarioExistente.setDataNascimento(usuarioAtualizado.getDataNascimento());
		usuarioExistente.setStatusUsuario(usuarioAtualizado.getStatusUsuario());
		usuarioExistente.setRm(usuarioAtualizado.getRm());

		// Se quiser permitir troca de senha na edição:
		if (usuarioAtualizado.getSenha() != null && !usuarioAtualizado.getSenha().isEmpty()) {
			String senhaCodificada = Base64.getEncoder().encodeToString(usuarioAtualizado.getSenha().getBytes());
			usuarioExistente.setSenha(senhaCodificada);
		}

		return usuarioRepository.save(usuarioExistente);
	}
}