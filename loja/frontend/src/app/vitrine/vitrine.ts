import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto';
import { ProdutoCard } from '../produto-card/produto-card';
import { mensagemErro } from '../service/api';
import { ProdutoService } from '../service/produto-service';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [ProdutoCard],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css'
})
export class Vitrine implements OnInit {
  lista: Produto[] = [];
  mensagem = '';
  loading = true;

  constructor(private service: ProdutoService) {}

  ngOnInit(): void {
    this.service.carregarVitrine().subscribe({
      next: value => {
        this.lista = value;
        this.loading = false;
      },
      error: err => {
        this.mensagem = mensagemErro(err, 'Ocorreu um erro! Tente mais tarde!');
        this.loading = false;
      }
    });
  }
}
