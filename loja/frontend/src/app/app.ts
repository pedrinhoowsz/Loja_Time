import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Barrabusca } from './barrabusca/barrabusca';
import { AuthService } from './service/auth-service';
import { CestaService } from './service/cesta-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Barrabusca],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  menuAberto = false;

  constructor(
    public auth: AuthService,
    public cesta: CestaService
  ) {}

  fecharMenu(): void {
    this.menuAberto = false;
  }

  sair(): void {
    this.auth.logout();
    this.fecharMenu();
  }
}
