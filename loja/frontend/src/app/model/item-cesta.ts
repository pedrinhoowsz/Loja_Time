import { Produto } from './produto';

export class ItemCesta {
  produto: Produto = new Produto();
  quantidade: number = 1;
  tamanho: string = '';

  get valorTotal(): number {
    return this.produto.preco * this.quantidade;
  }
}
