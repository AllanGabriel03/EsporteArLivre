import { Injectable } from '@angular/core';
import { CorridaModule } from '../models/corrida/corrida-module';
import { Observable } from '../../../node_modules/rxjs/dist/types/index';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class CorridaService {

  constructor(private http: HttpClient) { }

  adicionar(corrida: CorridaModule): Observable<CorridaModule>{
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida`

    return this.http.post<CorridaModule>(urlApi, corrida)
  }

  //listar corrida na api
  listarCorridas(): Observable<CorridaModule[]>{
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida`

    return this.http.get<CorridaModule[]>(urlApi)
  }

  private localizarCorrida(idCorrida: number):Observable<CorridaModule>{
    const urlApi =`https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida/${idCorrida}`
  
    return this.http.get<CorridaModule>(urlApi)
  }

  remover(corrida: CorridaModule): Observable<CorridaModule>{
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida/${corrida.id}`

    return this.http.delete<CorridaModule>(urlApi)
  }

  alterar(corrida: CorridaModule):Observable<CorridaModule>{
    const urlApi = `https://6a7f6d923183f5fd884b1a61.mockapi.io/esportearlivre/corrida/${corrida.id}`

    return this.http.put<CorridaModule>(urlApi, corrida)
  }
}
