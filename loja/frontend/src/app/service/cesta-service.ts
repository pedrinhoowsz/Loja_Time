import { Injectable } from '@angular/core';
import { ItemCesta } from '../model/item-cesta';
import { Produto } from '../model/produto';

/** Cesta de compras (fica só no navegador até finalizar o pedido). */
@Injectable({ providedIn: 'root' })
export class CestaService {
  static readonly MAX_POR_ITEM = 10;
  private chave = 'cesta';
  private itens: ItemCesta[] = [];

  constructor() {
    this.carregar();
  }

  getItens(): ItemCesta[] {
    return this.itens;
  }

  adicionar(produto: Produto, quantidade: number, tamanho: string): void {
    const existente = this.itens.find(i => i.produto.id === produto.id && i.tamanho === tamanho);
    if (existente) {
      existente.quantidade = this.limitar(existente.quantidade + quantidade);
    } else {
      const item = new ItemCesta();
      item.produto = produto;
      item.quantidade = this.limitar(quantidade);
      item.tamanho = tamanho;
      this.itens.push(item);
    }
    this.salvar();
  }

  remover(index: number): void {
    this.itens.splice(index, 1);
    this.salvar();
  }

  atualizarQuantidade(index: number, quantidade: number): void {
    if (!this.itens[index]) return;
    if (!quantidade || quantidade <= 0) {
      this.remover(index);
    } else {
      this.itens[index].quantidade = this.limitar(quantidade);
      this.salvar();
    }
  }

  getTotal(): number {
    return this.itens.reduce((soma, i) => soma + i.valorTotal, 0);
  }

  getQuantidadeTotal(): number {
    return this.itens.reduce((soma, i) => soma + i.quantidade, 0);
  }

  limpar(): void {
    this.itens = [];
    this.salvar();
  }

  private limitar(q: number): number {
    return Math.min(Math.max(Math.floor(q) || 1, 1), CestaService.MAX_POR_ITEM);
  }

  private salvar(): void {
    try {
      localStorage.setItem(this.chave, JSON.stringify(this.itens));
    } catch { /* storage indisponível */ }
  }

  private carregar(): void {
    try {
      const json = localStorage.getItem(this.chave);
      if (!json) return;
      const dados: Array<Partial<ItemCesta>> = JSON.parse(json);
      this.itens = dados
        .filter(d => d.produto)
        .map(d => Object.assign(new ItemCesta(), d));
    } catch {
      this.itens = [];
    }
  }
}
