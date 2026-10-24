package com.loja.service;

import com.loja.model.Produto;
import com.loja.repository.ProdutoRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<Produto> carregarVitrine() {
        return produtoRepository.findByAtivoTrue();
    }

    public List<Produto> buscar(String termo) {
        if (termo == null || termo.isBlank()) {
            return carregarVitrine();
        }
        return produtoRepository.buscar(termo.trim());
    }

    public Produto carregarProduto(Long id) {
        return produtoRepository.findByIdAndAtivoTrue(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado"));
    }
}
