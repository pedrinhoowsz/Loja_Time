import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Cliente } from '../model/cliente';
import { mensagemErro } from '../service/api';
import { ClienteService } from '../service/cliente-service';

/** Esqueci minha senha: 1) localiza o cadastro pelo email, 2) define a nova senha. */
@Component({
  selector: 'app-reenvio',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './reenvio.html'
})
export class Reenvio {
  email = '';
  novaSenha = '';
  cliente: Cliente | null = null;
  mensagem = '';
  erro = '';
  loading = false;

  readonly padraoSenha = '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}';

  constructor(private service: ClienteService) {}

  localizar(): void {
    this.erro = '';
    this.mensagem = '';
    this.loading = true;
    this.service.consultarPorEmail(this.email.trim()).subscribe({
      next: cliente => {
        this.cliente = cliente;
        this.loading = false;
      },
      error: err => {
        this.erro = mensagemErro(err, 'Email não encontrado. Verifique e tente novamente.');
        this.loading = false;
      }
    });
  }

  redefinir(form: NgForm): void {
    if (!this.cliente || form.invalid) {
      this.erro = 'Informe uma senha válida.';
      return;
    }
    this.erro = '';
    this.loading = true;
    this.service.redefinirSenha(this.cliente.email, this.novaSenha).subscribe({
      next: () => {
        this.mensagem = 'Senha redefinida com sucesso! Você já pode fazer login.';
        this.cliente = null;
        this.novaSenha = '';
        this.loading = false;
      },
      error: err => {
        this.erro = mensagemErro(err, 'Não foi possível redefinir a senha.');
        this.loading = false;
      }
    });
  }

  voltar(): void {
    this.cliente = null;
    this.novaSenha = '';
    this.erro = '';
  }
}
