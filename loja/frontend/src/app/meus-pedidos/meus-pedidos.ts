import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Pedido } from '../model/pedido';
import { mensagemErro } from '../service/api';
import { AuthService } from '../service/auth-service';
import { PedidoService } from '../service/pedido-service';

/** Histórico de pedidos do cliente logado. */
@Component({
  selector: 'app-meus-pedidos',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './meus-pedidos.html',
  styleUrl: './meus-pedidos.css'
})
export class MeusPedidos implements OnInit {
  lista: Pedido[] = [];
  aberto: number | null = null;
  erro = '';
  loading = true;

  constructor(
    private service: PedidoService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const cliente = this.auth.getCliente();
    if (!cliente) {
      this.router.navigate(['/login'], { queryParams: { retorno: '/meus-pedidos' } });
      return;
    }
    this.service.listarPorCliente(cliente.id).subscribe({
      next: value => {
        this.lista = value;
        this.aberto = value[0]?.id ?? null;
        this.loading = false;
      },
      error: err => {
        this.erro = mensagemErro(err, 'Não foi possível carregar os seus pedidos.');
        this.loading = false;
      }
    });
  }

  alternar(id: number): void {
    this.aberto = this.aberto === id ? null : id;
  }

  quantidadeItens(p: Pedido): number {
    return p.itens.reduce((soma, i) => soma + i.quantidade, 0);
  }
}
