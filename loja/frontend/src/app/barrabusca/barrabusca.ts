import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barrabusca',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './barrabusca.html',
  styleUrl: './barrabusca.css'
})
export class Barrabusca {
  termo = '';
  @Output() buscou = new EventEmitter<void>();

  constructor(private router: Router) {}

  buscar(): void {
    this.router.navigate(['/resultado-busca'], { queryParams: { termo: this.termo.trim() } });
    this.buscou.emit();
  }
}
