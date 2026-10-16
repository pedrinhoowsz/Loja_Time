import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente, LoginResponse } from '../model/cliente';
import { API_URL } from './api';

/** Integração com o ClienteController (/api/clientes). */
@Injectable({ providedIn: 'root' })
export class ClienteService {
  private url = `${API_URL}/clientes`;

  constructor(private http: HttpClient) {}

  /** POST /api/clientes */
  public gravar(obj: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, obj);
  }

  /** PUT /api/clientes/{id} */
  public alterar(id: number, obj: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}/${id}`, obj);
  }

  /** GET /api/clientes/{id} */
  public consultar(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  /** GET /api/clientes/email/{email} */
  public consultarPorEmail(email: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/email/${encodeURIComponent(email)}`);
  }

  /** POST /api/clientes/login */
  public login(email: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login`, { email, senha });
  }

  /** POST /api/clientes/redefinir-senha */
  public redefinirSenha(email: string, novaSenha: string): Observable<void> {
    return this.http.post<void>(`${this.url}/redefinir-senha`, { email, novaSenha });
  }
}
