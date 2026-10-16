import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ItemCesta } from '../model/item-cesta';
import { PedidoDTO } from '../model/pedido';
import { mensagemErro } from '../service/api';
import { AuthService } from '../service/auth-service';
import { CestaService } from '../service/cesta-service';
import { PedidoService } from '../service/pedido-service';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [RouterLink, FormsModule, CurrencyPipe],
  templateUrl: './cesta.html',
  styleUrl: './cesta.css'
})
export class Cesta {
  mensagem = '';
  erro = '';
  finalizando = false;
  readonly maxQuantidade = CestaService.MAX_POR_ITEM;

  constructor(
    public cesta: CestaService,
    public auth: AuthService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  get itens(): ItemCesta[] {
    return this.cesta.getItens();
  }

  remover(index: number): void {
    this.cesta.remover(index);
  }

  alterarQuantidade(index: number, quantidade: number): void {
    this.cesta.atualizarQuantidade(index, quantidade);
  }

  finalizarPedido(): void {
    const cliente = this.auth.getCliente();
    if (!cliente) {
      this.router.navigate(['/login'], { queryParams: { retorno: '/cesta' } });
      return;
    }
    if (this.itens.length === 0) return;

    this.finalizando = true;
    this.erro = '';

    const dto = new PedidoDTO();
    dto.clienteId = cliente.id;
    dto.itens = this.itens.map(i => ({
      produtoId: i.produto.id,
      quantidade: i.quantidade,
      tamanho: i.tamanho
    }));

    this.pedidoService.gravarPedido(dto).subscribe({
      next: () => {
        this.cesta.limpar();
        this.finalizando = false;
        this.router.navigate(['/pedido']);
      },
      error: err => {
        this.erro = mensagemErro(err, 'Erro ao finalizar o pedido. Tente novamente.');
        this.finalizando = false;
      }
    });
  }
}
