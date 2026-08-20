import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CorridaService } from '../../service/corrida-service';
import { CorridaModule } from '../../models/corrida/corrida-module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-corrida',
  imports: [FormsModule],
  templateUrl: './corrida.html',
  styleUrl: './corrida.css',
})

export class Corrida {
  id = 0
  descricao = ''
  dataDaCorrida = 0
  distancia = 0

  editar = false
  idCorrida = 0

  constructor(private corridaService: CorridaService, private route: ActivatedRoute, private cdr: ChangeDetectorRef){}

  exibeDados(){
    console.log(this.descricao, this.dataDaCorrida, this.distancia)
  }

  ngOnInit(){
    this.idCorrida = Number(this.route.snapshot.paramMap.get('id'))

    if (this.idCorrida > 0){
      this.editar = true
      this.carregaCampo(this.idCorrida)
    }
  }

  carregaCampo(idCorrida: number){
    this.corridaService.localizarCorrida(idCorrida)
    .subscribe({
      next:(objCorrida) => {
        this.id = objCorrida.id
        this.descricao = objCorrida.descricao
        this.distancia = objCorrida.distancia

        this.cdr.detectChanges()
      }, error: (msgErro) => {
        console.log("Erro ao listar a corrida ", msgErro)
      }
    })
  }

  enviaDadosCorrida(){
    const corrida = new CorridaModule()
    corrida.descricao = this.descricao
    corrida.distancia = this.distancia

    if(!this.editar) {
      this.corridaService.adicionar(corrida)
      .subscribe({
        next: (resposta) => {
          console.log(resposta)
        },
        error: (msgErro) => {
          console.log("Erro ao cadastrar a corrida ", msgErro)
        }
      })
    }else {
      corrida.id = this.idCorrida

      this.corridaService.alterar(corrida)
      .subscribe({
        next: (resposta) => {
          console.log(corrida)

          console.log(resposta)
        },
        error: (msgErro) => {
          console.log("Erro ao alerar a corrida", msgErro)
        }
      })
    }

    this.limparAtributos()
  }
  
  listaCorrida(idCorrida: number){
    this.corridaService.localizarCorrida(idCorrida)
    .subscribe({
      next: (dados) => {
        console.table(dados)
      },
      error: (msgErro) => {
        console.log("Erro ao listar corrdas ", msgErro)
      }
    })
  }

  limparAtributos(){
    this.descricao = ''
    this.dataDaCorrida = 0
    this.distancia = 0
  }


  /*salvarCorrida(){
    const corridas = new CorridaModule()
    corridas.descricao = this.descricao
    corridas.dataDaCorrida = this.dataDaCorrida
    corridas.distancia = this.distancia

    this.corridaService.adicionar(corridas)

    this.corridaService.listar()

    
  }

  limparAtributos(){
    this.descricao = ''
    this.dataDaCorrida = 0
    this.distancia = 0
  }*/
}
