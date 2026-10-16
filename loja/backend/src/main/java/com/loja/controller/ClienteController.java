package com.loja.controller;

import com.loja.dto.ClienteDTO;
import com.loja.dto.LoginDTO;
import com.loja.dto.RedefinirSenhaDTO;
import com.loja.model.Cliente;
import com.loja.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente gravar(@Valid @RequestBody ClienteDTO dto) {
        return clienteService.gravar(dto);
    }

    @PutMapping("/{id}")
    public Cliente alterar(@PathVariable Long id, @Valid @RequestBody ClienteDTO dto) {
        return clienteService.alterar(id, dto);
    }

    @GetMapping("/{id}")
    public Cliente consultar(@PathVariable Long id) {
        return clienteService.consultar(id);
    }

    @GetMapping("/email/{email}")
    public Cliente consultarPorEmail(@PathVariable String email) {
        return clienteService.consultarPorEmail(email);
    }

    @PostMapping("/login")
    public Object login(@Valid @RequestBody LoginDTO dto) {
        return clienteService.login(dto);
    }

    @PostMapping("/redefinir-senha")
    public void redefinirSenha(@Valid @RequestBody RedefinirSenhaDTO dto) {
        clienteService.redefinirSenha(dto);
    }
}
