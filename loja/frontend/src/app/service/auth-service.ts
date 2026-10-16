import { Injectable } from '@angular/core';
import { LoginResponse } from '../model/cliente';

/** Guarda o cliente logado (sessão do navegador). */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private chave = 'cliente';
  private cliente: LoginResponse | null = null;

  setCliente(cliente: LoginResponse): void {
    this.cliente = cliente;
    try {
      sessionStorage.setItem(this.chave, JSON.stringify(cliente));
    } catch { /* storage indisponível */ }
  }

  getCliente(): LoginResponse | null {
    if (!this.cliente) {
      try {
        const json = sessionStorage.getItem(this.chave);
        if (json) this.cliente = JSON.parse(json);
      } catch { /* storage indisponível */ }
    }
    return this.cliente;
  }

  isLoggedIn(): boolean {
    return this.getCliente() !== null;
  }

  logout(): void {
    this.cliente = null;
    try {
      sessionStorage.removeItem(this.chave);
    } catch { /* storage indisponível */ }
  }
}
