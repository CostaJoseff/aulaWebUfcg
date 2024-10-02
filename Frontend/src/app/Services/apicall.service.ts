import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APICallService {

  private urlEfetuarContagem = 'localhost:3000/efetuarContagem';
  private urlGetDados = 'localhost:3000/usuario/obterHistorico';

  constructor(private http: HttpClient) { }

  efetuarContagem(dados: any): Observable<any> {
    return this.http.post<any>(this.urlEfetuarContagem, dados);
  }

  getDados(): Observable<any> {
    return this.http.get<any>(this.urlGetDados);
  }
}
