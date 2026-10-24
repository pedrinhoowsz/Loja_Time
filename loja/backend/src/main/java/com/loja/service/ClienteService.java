package com.loja.service;

import com.loja.dto.ClienteDTO;
import com.loja.dto.LoginDTO;
import com.loja.dto.RedefinirSenhaDTO;
import com.loja.model.Cliente;
import com.loja.repository.ClienteRepository;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;

    public ClienteService(ClienteRepository clienteRepository, PasswordEncoder passwordEncoder) {
        this.clienteRepository = clienteRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Cliente gravar(ClienteDTO dto) {
        if (dto.getSenha() == null || dto.getSenha().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Senha é obrigatória");
        }
        String email = normalizarEmail(dto.getEmail());
        if (clienteRepository.existsByEmailIgnoreCase(email)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email já cadastrado");
        }
        Cliente cliente = mapToEntity(dto);
        cliente.setEmail(email);
        cliente.setSenha(passwordEncoder.encode(dto.getSenha()));
        return clienteRepository.save(cliente);
    }

    public Cliente alterar(Long id, ClienteDTO dto) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

        String email = normalizarEmail(dto.getEmail());
        clienteRepository.findByEmailIgnoreCase(email)
                .filter(c -> !c.getId().equals(id))
                .ifPresent(c -> {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email já cadastrado");
                });

        cliente.setNome(dto.getNome());
        cliente.setEmail(email);
        // senha em branco = mantem a atual
        if (dto.getSenha() != null && !dto.getSenha().isBlank()) {
            cliente.setSenha(passwordEncoder.encode(dto.getSenha()));
        }
        cliente.setTelefone(dto.getTelefone());
        cliente.setEndereco(dto.getEndereco());
        cliente.setCidade(dto.getCidade());
        cliente.setEstado(dto.getEstado());
        cliente.setCep(dto.getCep());

        return clienteRepository.save(cliente);
    }

    public Cliente consultar(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
    }

    public Cliente consultarPorEmail(String email) {
        return clienteRepository.findByEmailIgnoreCase(normalizarEmail(email))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
    }

    public Map<String, Object> login(LoginDTO dto) {
        Cliente cliente = clienteRepository.findByEmailIgnoreCase(normalizarEmail(dto.getEmail()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email ou senha inválidos"));

        if (!senhaConfere(cliente, dto.getSenha())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email ou senha inválidos");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("id", cliente.getId());
        response.put("nome", cliente.getNome());
        response.put("email", cliente.getEmail());
        return response;
    }

    public void redefinirSenha(RedefinirSenhaDTO dto) {
        Cliente cliente = clienteRepository.findByEmailIgnoreCase(normalizarEmail(dto.getEmail()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Email não encontrado"));

        cliente.setSenha(passwordEncoder.encode(dto.getNovaSenha()));
        clienteRepository.save(cliente);
    }

    /**
     * Confere a senha com o hash BCrypt. Contas antigas (gravadas em texto puro,
     * antes do hash) ainda conseguem entrar e ja tem a senha convertida para hash.
     */
    private boolean senhaConfere(Cliente cliente, String senhaInformada) {
        String salva = cliente.getSenha();
        if (salva == null) {
            return false;
        }
        if (salva.startsWith("$2")) {
            return passwordEncoder.matches(senhaInformada, salva);
        }
        if (salva.equals(senhaInformada)) {
            cliente.setSenha(passwordEncoder.encode(senhaInformada));
            clienteRepository.save(cliente);
            return true;
        }
        return false;
    }

    private static String normalizarEmail(String email) {
        return email == null ? null : email.trim().toLowerCase(Locale.ROOT);
    }

    private Cliente mapToEntity(ClienteDTO dto) {
        Cliente cliente = new Cliente();
        cliente.setNome(dto.getNome());
        cliente.setEmail(dto.getEmail());
        cliente.setTelefone(dto.getTelefone());
        cliente.setEndereco(dto.getEndereco());
        cliente.setCidade(dto.getCidade());
        cliente.setEstado(dto.getEstado());
        cliente.setCep(dto.getCep());
        return cliente;
    }
}
