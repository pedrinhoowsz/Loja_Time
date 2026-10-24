import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Cliente } from '../model/cliente';
import { mensagemErro } from '../service/api';
import { AuthService } from '../service/auth-service';
import { ClienteService } from '../service/cliente-service';

/**
 * Sem login: cria um novo cliente (gravar).
 * Com login: carrega os dados (consultar) e permite atualizar (alterar).
 */
@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.html'
})
export class Cadastro implements OnInit {
  obj: Cliente = new Cliente();
  editando = false;
  mensagem = '';
  erro = '';
  loading = false;

  /** Mínimo de 8 caracteres, com maiúscula, minúscula, número e especial. */
  readonly padraoSenha = '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}';
  readonly padraoTelefone = '(\\(?[0-9]{2}\\)? ?)?[0-9]{4,5}-?[0-9]{4}';

  constructor(
    private service: ClienteService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const logado = this.auth.getCliente();
    if (!logado) return;

    this.editando = true;
    this.loading = true;
    this.service.consultar(logado.id).subscribe({
      next: cliente => {
        // a senha nunca é exibida; em branco = manter a atual
        this.obj = Object.assign(new Cliente(), cliente, { senha: '' });
        this.loading = false;
      },
      error: err => {
        this.erro = mensagemErro(err, 'Não foi possível carregar os seus dados.');
        this.loading = false;
      }
    });
  }

  salvar(form: NgForm): void {
    this.mensagem = '';
    this.erro = '';
    if (form.invalid) {
      this.erro = 'Verifique os campos destacados.';
      return;
    }

    this.loading = true;
    if (this.editando && this.obj.id != null) {
      this.service.alterar(this.obj.id, this.obj).subscribe({
        next: salvo => {
          this.auth.setCliente({ id: salvo.id ?? this.obj.id!, nome: salvo.nome, email: salvo.email });
          this.mensagem = 'Dados atualizados com sucesso!';
          this.obj.senha = '';
          form.resetForm(this.obj);
          this.loading = false;
        },
        error: err => {
          this.erro = mensagemErro(err, 'Ocorreu um erro! Tente mais tarde!');
          this.loading = false;
        }
      });
    } else {
      this.service.gravar(this.obj).subscribe({
        next: () => {
          this.mensagem = 'Cadastro realizado com sucesso! Redirecionando para o login...';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/login']), 1500);
        },
        error: err => {
          this.erro = mensagemErro(err, 'Ocorreu um erro! Tente mais tarde!');
          this.loading = false;
        }
      });
    }
  }
}
