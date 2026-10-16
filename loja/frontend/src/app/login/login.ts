import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { mensagemErro } from '../service/api';
import { AuthService } from '../service/auth-service';
import { ClienteService } from '../service/cliente-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html'
})
export class Login implements OnInit {
  email = '';
  senha = '';
  erro = '';
  loading = false;
  private retorno = '/';

  constructor(
    private service: ClienteService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // só aceita caminhos internos (evita redirecionar para outro site)
    const r = this.route.snapshot.queryParamMap.get('retorno');
    if (r && r.startsWith('/') && !r.startsWith('//')) {
      this.retorno = r;
    }
  }

  entrar(): void {
    this.erro = '';
    this.loading = true;
    this.service.login(this.email.trim(), this.senha).subscribe({
      next: cliente => {
        this.auth.setCliente(cliente);
        this.loading = false;
        this.router.navigateByUrl(this.retorno);
      },
      error: err => {
        this.erro = mensagemErro(err, 'Verifique! Email ou senha incorretos!');
        this.loading = false;
      }
    });
  }
}
