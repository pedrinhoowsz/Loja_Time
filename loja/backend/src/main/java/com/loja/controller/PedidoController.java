package com.loja.controller;

import com.loja.dto.PedidoDTO;
import com.loja.model.Pedido;
import com.loja.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Pedido gravarPedido(@Valid @RequestBody PedidoDTO dto) {
        return pedidoService.gravarPedido(dto);
    }
}
