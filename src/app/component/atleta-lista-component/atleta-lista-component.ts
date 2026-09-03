import { Component, signal } from '@angular/core';
import { AtletaService } from '../../service/atleta-service';
import { Pessoa } from '../../models/pessoa/pessoa-module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atleta-lista-component',
  imports: [],
  templateUrl: './atleta-lista-component.html',
  styleUrl: './atleta-lista-component.css',
})
export class AtletaListaComponent {

  //DECLARAÇÃO ARRAY DO TIPO PESSOA
  //listaAtletas: Atleta[] = []
  listaAtletas = signal<Pessoa[]>([])

  //DECLARAÇÃO CONSTRUTOR
  constructor(private router: Router, private http: AtletaService) { }

  //EXECUTAR INSTRUÇÕES AO CARREGAR CRIAR O COMPONENTE
  ngOnInit() {
    this.listarAtletas()
  }

  //LISTAR OS ATLETAS
  listarAtletas() {
    this.http.listarAtletas()
      .subscribe({
        next: (dados) => {
          //this.listaAtletas = [...dados].sort((a, b) => a.nome.localeCompare(b.nome))
          this.listaAtletas.set([...dados].sort((a, b) => a.nome.localeCompare(b.nome)))
        },
        error: (msgErro) => {
          console.log("Erro ao cadastrar  o atleta ", msgErro)
        }

      })

  }

  //EXCLUIR ATLETA
  excluirAtleta(pessoa: Pessoa){
    if(confirm(`Deseja excluir ${pessoa.nome} da competição? `)){
      this.http.exluirAtleta(pessoa)
      .subscribe({
        next:(dados)=>{
           this.listaAtletas.update(elem =>
            elem.filter(a => a.id !== pessoa.id)
          );
          
          console.log('Atleta excluído com Sucesso ', dados)
        },
        error: (msgErro) => {
          console.log("Erro ao Excluir  o atleta ", msgErro)
        }
      })

    }
    this.ngOnInit()
  }

  //ALTERAR DADOS
  buscarPessoa(idAtleta: Pessoa){
    this.router.navigate(['/cadastroatleta', idAtleta])
  }

  calcIdade(data_nascimento: string){
    return this.http.calcularIdade(data_nascimento)
  }
  
  calcImc(peso: number, altura: number){
    let imc = (peso / (altura * altura))
    let situacao = ''

    if(imc < 18.5){
     situacao = "Magreza" 
    }else if(imc >= 18.5 && imc <= 24.9){
     situacao = "Peso Normal"
    }else if(imc >= 25 && imc <= 29.9){
      situacao = "Sobrepeso"
    }else if(imc >= 30 && imc <= 39.9){
      situacao = "Obesidade"
    }else{situacao = "Obesidade grave"}

    return situacao
  }

}//FIM COMPONENT AtletaListaComponent
