package com.loja.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ItemPedidoDTO {

    @NotNull
    private Long produtoId;

    @NotNull
    @Positive(message = "Quantidade inválida")
    @Max(value = 10, message = "Máximo de 10 unidades por item")
    private Integer quantidade;

    private String tamanho;

    public Long getProdutoId() {
        return produtoId;
    }

    public void setProdutoId(Long produtoId) {
        this.produtoId = produtoId;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public String getTamanho() {
        return tamanho;
    }

    public void setTamanho(String tamanho) {
        this.tamanho = tamanho;
    }
}
