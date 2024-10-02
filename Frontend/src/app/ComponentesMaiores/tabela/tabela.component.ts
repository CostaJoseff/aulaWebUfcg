import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css'
})
export class TabelaComponent {

  itens: any = []

  addLinha() {
    let corList = this.getRandomColor();
    let cor = `rgb(${corList[0]}, ${corList[1]}, ${corList[2]})`
    let novaLinha = {
      cor,
      corList,
      nome: `Linha ${this.itens.length + 1}`,
      direcao: this.getRandomDirection()
    }
    this.itens.push(novaLinha)
  }

  private getRandomDirection(): Direcao {
      const directions = Object.values(Direcao);
      const randomIndex = Math.floor(Math.random() * directions.length);
      return directions[randomIndex];
  }

  private getRandomColor(): number[] {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return [r, g, b];
  }
}

enum Direcao {
  CIMA_BAIXO = 'CIMA_BAIXO',
  ESQUERDA_DIREITA = 'ESQUERDA_DIREITA',
  BAIXO_CIMA = 'BAIXO_CIMA',
  DIREITA_ESQUERDA = 'DIREITA_ESQUERDA'
}
