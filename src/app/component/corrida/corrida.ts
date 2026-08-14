import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-corrida',
  imports: [FormsModule],
  templateUrl: './corrida.html',
  styleUrl: './corrida.css',
})
export class Corrida {

  descricao = ''
  dataDaCorrida = ''
  distancia = ''

  exibeDados(){
    console.log(this.descricao, this.dataDaCorrida, this.distancia)
  }
}
