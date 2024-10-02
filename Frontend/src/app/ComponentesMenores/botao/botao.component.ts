import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botao',
  standalone: true,
  imports: [],
  templateUrl: './botao.component.html',
  styleUrl: './botao.component.css'
})
export class BotaoComponent {

  @Input() texto: string = '';
  @Input() rota: string = '';

  constructor(private router: Router) {}

  ativar() {
    this.router.navigate([this.rota]);
  }
}
