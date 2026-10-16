import { HttpErrorResponse } from '@angular/common/http';

/** Endereço do backend Spring Boot (server.port=8082). */
export const API_URL = 'http://localhost:8082/api';

/** Transforma um erro HTTP em texto amigável para a tela. */
export function mensagemErro(err: unknown, padrao: string): string {
  if (err instanceof HttpErrorResponse) {
    if (err.status === 0) {
      return 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.';
    }
    const msg = err.error?.message;
    if (typeof msg === 'string' && msg.trim().length > 0) {
      return msg;
    }
  }
  return padrao;
}
