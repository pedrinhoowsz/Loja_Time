import { Cliente } from './cliente';
import { Produto } from './produto';

/** Item enviado ao backend (ItemPedidoDTO) */
export class ItemPedidoDTO {
  produtoId: number = 0;
  quantidade: number = 1;
  tamanho: string = '';
}

/** Corpo do POST /api/pedidos (PedidoDTO) */
export class PedidoDTO {
  clienteId: number = 0;
  itens: ItemPedidoDTO[] = [];
}

/** Item devolvido pelo backend */
export class ItemPedido {
  id?: number;
  produto: Produto = new Produto();
  quantidade: number = 0;
  tamanho: string = '';
  precoUnitario: number = 0;
}

/** Pedido devolvido pelo backend */
export class Pedido {
  id: number = 0;
  cliente?: Cliente;
  dataPedido: string = '';
  status: string = '';
  total: number = 0;
  itens: ItemPedido[] = [];
}
