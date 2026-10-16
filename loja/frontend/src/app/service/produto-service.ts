import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto';
import { API_URL } from './api';

/** Integração com o ProdutoController (/api/produtos). */
@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private url = `${API_URL}/produtos`;

  constructor(private http: HttpClient) {}

  /** GET /api/produtos/vitrine */
  public carregarVitrine(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.url}/vitrine`);
  }

  /** GET /api/produtos/busca?termo= */
  public buscar(termo: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.url}/busca`, { params: { termo } });
  }

  /** GET /api/produtos/{id} */
  public carregarProduto(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.url}/${id}`);
  }
}
