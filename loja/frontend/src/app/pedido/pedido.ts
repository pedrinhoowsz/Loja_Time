import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pedido as PedidoModel } from '../model/pedido';
import { PedidoService } from '../service/pedido-service';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './pedido.html',
  styleUrl: './pedido.css'
})
export class Pedido implements OnInit {
  obj: PedidoModel | null = null;

  constructor(private service: PedidoService) {}

  ngOnInit(): void {
    this.obj = this.service.getUltimoPedido();
  }
}
