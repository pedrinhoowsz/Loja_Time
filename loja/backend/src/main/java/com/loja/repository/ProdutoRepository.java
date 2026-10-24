package com.loja.repository;

import com.loja.model.Produto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    List<Produto> findByAtivoTrue();

    Optional<Produto> findByIdAndAtivoTrue(Long id);

    Optional<Produto> findByImagem(String imagem);

    @Query("SELECT p FROM Produto p WHERE p.ativo = true AND " +
           "(LOWER(p.nome) LIKE LOWER(CONCAT('%', :termo, '%')) OR " +
           "LOWER(p.descricao) LIKE LOWER(CONCAT('%', :termo, '%')) OR " +
           "LOWER(p.time) LIKE LOWER(CONCAT('%', :termo, '%')) OR " +
           "LOWER(p.categoria) LIKE LOWER(CONCAT('%', :termo, '%')))")
    List<Produto> buscar(@Param("termo") String termo);
}
