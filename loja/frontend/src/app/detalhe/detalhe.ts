import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Produto } from '../model/produto';
import { mensagemErro } from '../service/api';
import { CestaService } from '../service/cesta-service';
import { ProdutoService } from '../service/produto-service';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [RouterLink, FormsModule, CurrencyPipe],
  templateUrl: './detalhe.html',
  styleUrl: './detalhe.css'
})
export class Detalhe implements OnInit, OnDestroy {
  obj: Produto | null = null;
  tamanhos: string[] = [];
  tamanhoSelecionado = '';
  quantidade = 1;
  loading = true;
  erro = '';
  mensagem = '';
  readonly maxQuantidade = CestaService.MAX_POR_ITEM;
  private sub?: Subscription;
  private timer?: ReturnType<typeof setTimeout>;

  constructor(
    private route: ActivatedRoute,
    private service: ProdutoService,
    private cesta: CestaService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => this.carregar(Number(params.get('id'))));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    clearTimeout(this.timer);
  }

  private carregar(id: number): void {
    this.loading = true;
    this.erro = '';
    this.obj = null;
    this.service.carregarProduto(id).subscribe({
      next: value => {
        this.obj = value;
        this.tamanhos = Produto.listaTamanhos(value);
        this.tamanhoSelecionado = this.tamanhos[0] ?? '';
        this.quantidade = 1;
        this.loading = false;
      },
      error: err => {
        this.erro = mensagemErro(err, 'Produto inválido, verifique!');
        this.loading = false;
      }
    });
  }

  comprar(): void {
    if (!this.obj) return;
    if (this.tamanhos.length > 0 && !this.tamanhoSelecionado) {
      this.mensagem = 'Selecione um tamanho.';
      return;
    }
    const q = Math.min(Math.max(Math.floor(this.quantidade) || 1, 1), this.maxQuantidade);
    this.quantidade = q;
    this.cesta.adicionar(this.obj, q, this.tamanhoSelecionado);
    this.mensagem = 'Produto adicionado à cesta!';
    clearTimeout(this.timer);
    this.timer = setTimeout(() => (this.mensagem = ''), 3000);
  }
}
