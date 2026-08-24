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

  
}//FIM COMPONENT AtletaListaComponent
