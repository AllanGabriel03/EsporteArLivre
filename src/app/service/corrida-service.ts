import { Injectable } from '@angular/core';
import { CorridaModule } from '../models/corrida/corrida-module';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class CorridaService {

  constructor(private http: HttpClient) { }

  adicionar(corrida: CorridaModule): Observable<CorridaModule>{
    const urlApi = `http://127.0.0.1:8000/corrida/`

    return this.http.post<CorridaModule>(urlApi, corrida)
  }

  //listar corrida na api
  listarCorridas(): Observable<CorridaModule[]>{
    const urlApi = `http://127.0.0.1:8000/corrida/`

    return this.http.get<CorridaModule[]>(urlApi)
  }

  localizarCorrida(idCorrida: number):Observable<CorridaModule>{
    const urlApi =`http://127.0.0.1:8000/corrida/${idCorrida}`
  
    return this.http.get<CorridaModule>(urlApi)
  }

  remover(idCorrida: number){
    const urlApi = `http://127.0.0.1:8000/corrida/${idCorrida}`

    return this.http.delete<CorridaModule>(urlApi)
  }

  alterar(corrida: CorridaModule):Observable<CorridaModule>{
    const urlApi = `http://127.0.0.1:8000/corrida/${corrida.idcorrida}`

    return this.http.put<CorridaModule>(urlApi, corrida)
  }
}
