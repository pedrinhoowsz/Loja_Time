package com.loja.repository;

import com.loja.model.Pedido;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    @EntityGraph(attributePaths = {"cliente", "itens", "itens.produto"})
    List<Pedido> findByClienteIdOrderByDataPedidoDesc(Long clienteId);
}
