import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Produto } from '../model/produto';
import { ProdutoCard } from '../produto-card/produto-card';
import { mensagemErro } from '../service/api';
import { ProdutoService } from '../service/produto-service';

@Component({
  selector: 'app-resultado-busca',
  standalone: true,
  imports: [ProdutoCard],
  templateUrl: './resultado-busca.html'
})
export class ResultadoBusca implements OnInit, OnDestroy {
  termo = '';
  lista: Produto[] = [];
  mensagem = '';
  loading = false;
  private sub?: Subscription;

  constructor(
    private service: ProdutoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub = this.route.queryParamMap.subscribe(params => {
      this.termo = params.get('termo') ?? '';
      this.buscar();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private buscar(): void {
    this.loading = true;
    this.mensagem = '';
    this.service.buscar(this.termo).subscribe({
      next: value => {
        this.lista = value;
        this.loading = false;
      },
      error: err => {
        this.lista = [];
        this.mensagem = mensagemErro(err, 'Ocorreu um erro! Tente mais tarde!');
        this.loading = false;
      }
    });
  }
}
