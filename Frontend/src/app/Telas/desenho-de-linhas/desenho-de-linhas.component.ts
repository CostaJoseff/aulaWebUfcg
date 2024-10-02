import { Component, ViewChild } from '@angular/core';
import { TabelaComponent } from '../../ComponentesMaiores/tabela/tabela.component';

@Component({
  selector: 'app-desenho-de-linhas',
  standalone: true,
  imports: [TabelaComponent],
  templateUrl: './desenho-de-linhas.component.html',
  styleUrl: './desenho-de-linhas.component.css'
})
export class DesenhoDeLinhasComponent {

  @ViewChild(TabelaComponent) tabela!: TabelaComponent;

  addLinha() {
    this.tabela.addLinha();
  }

}
