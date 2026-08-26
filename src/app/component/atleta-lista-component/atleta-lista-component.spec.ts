import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtletaListaComponent } from './atleta-lista-component';
import { AtletaService } from '../../service/atleta-service';
import { provideHttpClient } from '@angular/common/http';

import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Pessoa } from '../../models/pessoa/pessoa-module';

describe('AtletaListaComponent', () => {

  let service : AtletaService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AtletaService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    service = TestBed.inject(AtletaService)

    httpMock = TestBed.inject(HttpTestingController)

  });

  it('Resultado esperado é calular corretamente a idade', () => {
    const resultado = service.calcularIdade('2003-11-11')
    expect(resultado).toBe(22);
  });

  it('Resultado esperado da lista de atletas', () =>{
    const atletas : Pessoa[] = [
      {
        "nome": "Rute",
        "cpf": 78945612300,
        "sexo": "",
        "cep": 49001456,
        "ruaLogradouro": "Rua Capela",
        "bairro": "Centro",
        "cidade": "Aracaju",
        "uf": "SE",
        "dataNascimento": "1980-02-12",
        "id": 1
      },
    {
        "nome": "Maria",
        "cpf": 78945612300,
        "sexo": "",
        "cep": 49001456,
        "ruaLogradouro": "Rua Capela",
        "bairro": "Centro",
        "cidade": "Aracaju",
        "uf": "SE",
        "dataNascimento": "1980-02-12",
        "id": 2
      }
    ]
      service.listarAtletas().subscribe(result => {
        expect(result).toEqual(atletas)
      })

      const requisicao = httpMock.expectOne('https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/atleta')

      expect(requisicao.request.method).toBe('POST')

      requisicao.flush(atletas)
    
  })
});
