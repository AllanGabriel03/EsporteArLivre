import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CorridaService } from '../../service/corrida-service';
import { CorridaModule } from '../../models/corrida/corrida-module';

@Component({
  selector: 'app-corrida',
  imports: [FormsModule],
  templateUrl: './corrida.html',
  styleUrl: './corrida.css',
})
export class Corrida {

  descricao = ''
  dataDaCorrida = 0
  distancia = 0

  constructor(private corridaService: CorridaService){}

  exibeDados(){
    console.log(this.descricao, this.dataDaCorrida, this.distancia)
  }

  salvarCorrida(){
    const corridas = new CorridaModule()
    corridas.descricao = this.descricao
    corridas.dataDaCorrida = this.dataDaCorrida
    corridas.distancia = this.distancia

    this.corridaService.adicionar(corridas)

    this.corridaService.listar()

    
  }

  /*limparAtributos(){
    this.descricao = ''
    this.dataDaCorrida = 0
    this.distancia = 0
  }*/
}
