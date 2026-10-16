package com.loja.service;

import com.loja.dto.ItemPedidoDTO;
import com.loja.dto.PedidoDTO;
import com.loja.model.Cliente;
import com.loja.model.ItemPedido;
import com.loja.model.Pedido;
import com.loja.model.Produto;
import com.loja.repository.ClienteRepository;
import com.loja.repository.PedidoRepository;
import com.loja.repository.ProdutoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;
    private final ProdutoRepository produtoRepository;

    public PedidoService(PedidoRepository pedidoRepository,
                         ClienteRepository clienteRepository,
                         ProdutoRepository produtoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.clienteRepository = clienteRepository;
        this.produtoRepository = produtoRepository;
    }

    @Transactional
    public Pedido gravarPedido(PedidoDTO dto) {
        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

        Pedido pedido = new Pedido();
        pedido.setCliente(cliente);

        double total = 0;

        for (ItemPedidoDTO itemDto : dto.getItens()) {
            Produto produto = produtoRepository.findById(itemDto.getProdutoId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Produto não encontrado: " + itemDto.getProdutoId()));

            ItemPedido item = new ItemPedido();
            item.setPedido(pedido);
            item.setProduto(produto);
            item.setQuantidade(itemDto.getQuantidade());
            item.setTamanho(itemDto.getTamanho());
            item.setPrecoUnitario(produto.getPreco());

            total += produto.getPreco() * itemDto.getQuantidade();
            pedido.getItens().add(item);
        }

        pedido.setTotal(total);
        return pedidoRepository.save(pedido);
    }
}
