import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-produto-card',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './produto-card.html',
  styleUrl: './produto-card.css'
})
export class ProdutoCard {
  @Input({ required: true }) produto!: Produto;
}
