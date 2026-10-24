import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Pedido, PedidoDTO } from '../model/pedido';
import { API_URL } from './api';

/** Integração com o PedidoController (/api/pedidos). */
@Injectable({ providedIn: 'root' })
export class PedidoService {
  private url = `${API_URL}/pedidos`;
  private chave = 'ultimoPedido';
  private ultimo: Pedido | null = null;

  constructor(private http: HttpClient) {}

  /** POST /api/pedidos */
  public gravarPedido(dto: PedidoDTO): Observable<Pedido> {
    return this.http.post<Pedido>(this.url, dto).pipe(
      tap(p => this.guardarUltimo(p))
    );
  }

  /** GET /api/pedidos/cliente/{clienteId} */
  public listarPorCliente(clienteId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.url}/cliente/${clienteId}`);
  }

  /** Último pedido gravado (sobrevive a recarregar a página). */
  public getUltimoPedido(): Pedido | null {
    if (!this.ultimo) {
      try {
        const json = sessionStorage.getItem(this.chave);
        if (json) this.ultimo = JSON.parse(json);
      } catch { /* storage indisponível */ }
    }
    return this.ultimo;
  }

  private guardarUltimo(p: Pedido): void {
    this.ultimo = p;
    try {
      sessionStorage.setItem(this.chave, JSON.stringify(p));
    } catch { /* storage indisponível */ }
  }
}
