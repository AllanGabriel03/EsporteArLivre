import { Component, signal } from '@angular/core';
import { CorridaService } from '../../service/corrida-service';
import { Router } from '@angular/router';
import { CorridaModule } from '../../models/corrida/corrida-module';

@Component({
  selector: 'app-corrida-lista',
  imports: [],
  templateUrl: './corrida-lista.html',
  styleUrl: './corrida-lista.css',
})
export class CorridaLista {
  listaCorridas = signal<CorridaModule[]>([])

  constructor(
    private corridaService: CorridaService,
    private router: Router
  ){}
  
  ngOnInit(){
    this.listar()
  }

  listar(){
    this.corridaService.listarCorridas()
      .subscribe({
        next: (dadosCorrida) => {
          this.listaCorridas.set([...dadosCorrida])
        },
        error: (msgErro) => {
          console.log(msgErro)
        }
        
      })
  }

  excluir(objCorrida: CorridaModule){
    if(confirm(`Deseja excluir a corrida ${objCorrida.descricao_corrida}`)){
      this.corridaService.remover(objCorrida.idcorrida)
      .subscribe({
        next: (resposta) => {
          this.listaCorridas.update(elem =>
            elem.filter(a => a.idcorrida !== objCorrida.idcorrida))
            console.log('Atleta excluído com sucesso ', resposta)
        },
        error: (msgErro) => {
          return msgErro
        }
      })
    }

    this.ngOnInit()

  }
  

  carregaCampo(objCorrida: CorridaModule){
    this.router.navigate(["/alteraCorrida", objCorrida.idcorrida])
  }
}
