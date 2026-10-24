import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Produto } from '../model/produto';
import { ProdutoCard } from '../produto-card/produto-card';
import { mensagemErro } from '../service/api';
import { ProdutoService } from '../service/produto-service';

type Ordem = 'padrao' | 'menor-preco' | 'maior-preco' | 'nome';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [ProdutoCard, FormsModule],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css'
})
export class Vitrine implements OnInit {
  lista: Produto[] = [];
  mensagem = '';
  loading = true;

  /** Filtros da vitrine ('' = todos) */
  categoria = '';
  time = '';
  ordem: Ordem = 'padrao';

  categorias: string[] = [];
  times: string[] = [];

  constructor(private service: ProdutoService) {}

  ngOnInit(): void {
    this.service.carregarVitrine().subscribe({
      next: value => {
        this.lista = value;
        this.categorias = this.distintos(value.map(p => p.categoria));
        this.times = this.distintos(value.map(p => p.time));
        this.loading = false;
      },
      error: err => {
        this.mensagem = mensagemErro(err, 'Ocorreu um erro! Tente mais tarde!');
        this.loading = false;
      }
    });
  }

  get filtrada(): Produto[] {
    const r = this.lista.filter(p =>
      (!this.categoria || p.categoria === this.categoria) &&
      (!this.time || p.time === this.time)
    );
    switch (this.ordem) {
      case 'menor-preco': return [...r].sort((a, b) => a.preco - b.preco);
      case 'maior-preco': return [...r].sort((a, b) => b.preco - a.preco);
      case 'nome': return [...r].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
      default: return r;
    }
  }

  get temFiltro(): boolean {
    return !!this.categoria || !!this.time || this.ordem !== 'padrao';
  }

  limparFiltros(): void {
    this.categoria = '';
    this.time = '';
    this.ordem = 'padrao';
  }

  private distintos(valores: string[]): string[] {
    return [...new Set(valores.filter(v => !!v))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }
}
