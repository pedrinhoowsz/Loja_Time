package com.loja.controller;

import com.loja.model.Produto;
import com.loja.service.ProdutoService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping("/vitrine")
    public List<Produto> carregarVitrine() {
        return produtoService.carregarVitrine();
    }

    @GetMapping("/busca")
    public List<Produto> buscar(@RequestParam(required = false) String termo) {
        return produtoService.buscar(termo);
    }

    @GetMapping("/{id}")
    public Produto carregarProduto(@PathVariable Long id) {
        return produtoService.carregarProduto(id);
    }
}
