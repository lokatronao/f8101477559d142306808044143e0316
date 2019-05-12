import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  traducir(texto: string, target: string) {

    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    return new Promise((resolve, reject) => {

      const body = {
        text: texto,
        target: target
      };

      const headers = new HttpHeaders({
        'x-token': this.usuarioService.token
      });

      this.http.post(`${URL}/translate/translate`, body, {headers})
      .subscribe(resp => {
        if (resp['ok']) {
          sleep(3000).then(() => {
            resolve(resp);
          });
        } else {
          reject(resp);
        }
      });
    });
  }
}
