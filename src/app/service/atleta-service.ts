/*import { Injectable } from '@angular/core';
import { Pessoa } from '../models/pessoa/pessoa-module';


@Injectable({
  providedIn: 'root',
})
export class AtletaService {
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
}*/


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../models/pessoa/pessoa-module';

@Injectable({
  providedIn: 'root',
})

export class AtletaService {
  //DECLARAÇÃO CONSTRUTOR
  constructor(private http: HttpClient) { }

  //ADICIONAR NA API
  adicionarAtleta(pessoa: Pessoa): Observable<Pessoa> {
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/atleta`

    return this.http.post<Pessoa>(urlApi, pessoa)
  }

  //LISTAR ATLETAS NA API
  listarAtletas(): Observable<Pessoa[]> {
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/atleta`

    return this.http.get<Pessoa[]>(urlApi)
  }

  //LISTAR ATLETA
  listarAtleta(idPessoa: number):Observable<Pessoa>{
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/atleta/${idPessoa}`

    return this.http.get<Pessoa>(urlApi)
  }

  //EXCLUIR NA API
  exluirAtleta(atleta: Pessoa): Observable<Pessoa> {
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/atleta/${atleta.id}`

    return this.http.delete<Pessoa>(urlApi)
  }

  //ALTERAR NA API
  alterarAtleta(atleta: Pessoa):Observable<Pessoa>{
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/atleta/${atleta.id}`

    return this.http.put<Pessoa>(urlApi, atleta)
  }

  calcularIdade(dataNascimento: string): number {
    
    const hoje = new Date();
    const nascimento = new Date(dataNascimento)

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mes = hoje.getMonth() - nascimento.getMonth();

    if(mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())){
      idade--
    }

    return idade
  }

  /*
  private atletas: Pessoa[] = []

  adicionar(pessoa: Pessoa) {
    //ARRRRMENGUEEEE PARA GERAR O ID
    pessoa.id = this.atletas.length + 1
    
    this.atletas.push(pessoa)
  }

  listar() {
    console.table(this.atletas)
    return this.atletas
  }

  private localizarAtleta(idAtleta: number){
    return this.atletas.findIndex(elem => elem.id === idAtleta)
  }

  remover(posicaoArray: number){
    this.atletas.splice(1,posicaoArray)
  }

  remover2(pessoa: Pessoa){
    this.atletas = this.atletas.filter(elem => elem.id !== pessoa.id)
  }

  alterar(pessoa : Pessoa){
    let posArray = this.localizarAtleta(pessoa.id)

    if(posArray >=0){
      this.atletas[posArray] = pessoa
    }

  }*/

}


