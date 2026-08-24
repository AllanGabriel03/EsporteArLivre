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
  dataDaCorrida = ''
  distancia5km = false
  distancia10km = false
  distancia25km = false

  editar = false
  idCorrida = 0

  constructor(
    private corridaService: CorridaService, 
    private route: ActivatedRoute, 
    private cdr: ChangeDetectorRef
  ){}

  exibeDados(){
    console.log(this.descricao, this.dataDaCorrida, this.distancia5km, this.distancia10km, this.distancia25km)
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
        this.dataDaCorrida = objCorrida.dataDaCorrida
        this.distancia5km = objCorrida.distancia5km
        this.distancia10km = objCorrida.distancia10km
        this.distancia25km = objCorrida.distancia25km

        this.cdr.detectChanges()
      }, error: (msgErro) => {
        return msgErro
      }
    })
  }

  enviaDadosCorrida(){
    const corrida = new CorridaModule()
    corrida.descricao = this.descricao
    corrida.dataDaCorrida = this.dataDaCorrida
    corrida.distancia5km = this.distancia5km
    corrida.distancia10km = this.distancia10km
    corrida.distancia25km = this.distancia25km

    if(this.editar) {
      corrida.id = this.idCorrida

      this.corridaService.alterar(corrida)
      .subscribe({
        next: (resposta) => {
          return resposta
        },
        error: (msgErro) => {
          return msgErro
        }
      })
    }else {
      this.corridaService.adicionar(corrida)
      .subscribe({
        next: (resposta) => {
          return resposta
        },
        error: (msgErro) => {
          return msgErro
        }
      })
    }

    this.limparAtributos()
  }
  
  

  limparAtributos(){
    this.descricao = ''
    this.dataDaCorrida = ''
    this.distancia5km = false
    this.distancia10km = false
    this.distancia25km = false
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
