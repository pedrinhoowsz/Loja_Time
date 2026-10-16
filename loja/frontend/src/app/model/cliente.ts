export class Cliente {
  id?: number;
  nome: string = '';
  email: string = '';
  senha: string = '';
  telefone: string = '';
  endereco: string = '';
  cidade: string = '';
  estado: string = '';
  cep: string = '';
}

/** Resposta do POST /api/clientes/login */
export class LoginResponse {
  id: number = 0;
  nome: string = '';
  email: string = '';
}
