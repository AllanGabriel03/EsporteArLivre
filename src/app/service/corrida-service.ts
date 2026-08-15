import { Injectable } from '@angular/core';
import { CorridaModule } from '../models/corrida/corrida-module';

@Injectable({
  providedIn: 'root',
})

export class CorridaService {
  private corridas : CorridaModule [] = []

  adicionar(corrida: CorridaModule){
    corrida.id = this.corridas.length + 1

    this.corridas.push(corrida)
  }

  listar(){
    console.table(this.corridas)
    return this.corridas
  }

  private localizarCorrida(idCorrida: number){
    return this.corridas.findIndex(elem => elem.id === idCorrida)
  }

  remover(posicaoArray: number){
    this.corridas.splice(1, posicaoArray)
  }

  alterar(corrida: CorridaModule){
    let posArray = this.localizarCorrida(corrida.id)

    if(posArray >= 0){
      this.corridas[posArray] = corrida
    }
  }
}
