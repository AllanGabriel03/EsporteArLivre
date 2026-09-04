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
  idcorrida = 0
  descricao_corrida = ''
  data_corrida = ''
  distancia_5km = false
  distancia_10km = false
  distancia_25km = false

  editar = false
  idCorrida = 0

  constructor(
    private corridaService: CorridaService, 
    private route: ActivatedRoute, 
    private cdr: ChangeDetectorRef
  ){}

  exibeDados(){
    console.log(this.descricao_corrida, this.data_corrida, this.distancia_5km, this.distancia_10km, this.distancia_25km)
  }

  ngOnInit(){
    this.idCorrida = Number(this.route.snapshot.paramMap.get('idcorrida'))

    if (this.idCorrida > 0){
      this.editar = true
      this.carregaCampo(this.idCorrida)
    }
  }

  carregaCampo(idCorrida: number){
    this.corridaService.localizarCorrida(idCorrida)
    .subscribe({
      next:(objCorrida) => {
        this.idcorrida = objCorrida.idcorrida
        this.descricao_corrida = objCorrida.descricao_corrida
        this.data_corrida = objCorrida.data_corrida
        this.distancia_5km = objCorrida.distancia_5km
        this.distancia_10km = objCorrida.distancia_10km
        this.distancia_25km = objCorrida.distancia_25km

        this.cdr.detectChanges()
      }, error: (msgErro) => {
        return msgErro
      }
    })
  }

  enviaDadosCorrida(){
    const corrida = new CorridaModule()
    corrida.descricao_corrida = this.descricao_corrida
    corrida.data_corrida = this.data_corrida
    corrida.distancia_5km = this.distancia_5km
    corrida.distancia_10km = this.distancia_10km
    corrida.distancia_25km = this.distancia_25km

    if(this.editar) {
      corrida.idcorrida = this.idCorrida

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
    this.descricao_corrida = ''
    this.data_corrida = ''
    this.distancia_5km = false
    this.distancia_10km = false
    this.distancia_25km = false
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
