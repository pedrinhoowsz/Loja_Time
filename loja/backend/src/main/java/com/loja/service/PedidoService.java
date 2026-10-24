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
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Arrays;
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

        // BigDecimal evita erro de arredondamento (ex.: 349.90 * 3 = 1049.6999...)
        BigDecimal total = BigDecimal.ZERO;

        for (ItemPedidoDTO itemDto : dto.getItens()) {
            Produto produto = produtoRepository.findByIdAndAtivoTrue(itemDto.getProdutoId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "Produto indisponível: " + itemDto.getProdutoId()));

            validarTamanho(produto, itemDto.getTamanho());

            ItemPedido item = new ItemPedido();
            item.setPedido(pedido);
            item.setProduto(produto);
            item.setQuantidade(itemDto.getQuantidade());
            item.setTamanho(itemDto.getTamanho());
            item.setPrecoUnitario(produto.getPreco());

            total = total.add(BigDecimal.valueOf(produto.getPreco())
                    .multiply(BigDecimal.valueOf(itemDto.getQuantidade())));
            pedido.getItens().add(item);
        }

        pedido.setTotal(total.setScale(2, RoundingMode.HALF_UP).doubleValue());
        return pedidoRepository.save(pedido);
    }

    private void validarTamanho(Produto produto, String tamanho) {
        if (produto.getTamanhos() == null || produto.getTamanhos().isBlank()) {
            return;
        }
        boolean valido = tamanho != null && Arrays.stream(produto.getTamanhos().split(","))
                .map(String::trim)
                .anyMatch(t -> t.equalsIgnoreCase(tamanho.trim()));
        if (!valido) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Tamanho inválido para " + produto.getNome());
        }
    }
}
