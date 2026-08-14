import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class Atleta {
  private atletas : Pessoa[] = []

  adicionar(pessoa: Pessoa){
    pessoa.id = this.atletas.length + 1

    this.atletas.push(pessoa)
  }

  listar(){
    console.table(this.atletas)
    return this.atletas
  }

  private localizarAtleta(idAtleta: number){
    return this.atletas.findIndex(elem => elem.id === idAtleta)
  }

  remover(posicaoArray: number){
    this.atletas.splice(1, posicaoArray)
  }

  alterar(pessoa: Pessoa){
    let posArray = this.localizarAtleta(pessoa.id)

    if(posArray >= 0){
      this.atletas[posArray] = pessoa
    }
  }
}
