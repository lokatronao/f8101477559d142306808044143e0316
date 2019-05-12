import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: Usuario = {};
  private idiomas: String[] = ['es', 'en'];

  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController, private translateService: TranslateService) { console.log(URL) }

  login( email: string, password: string) {
    const data = {email, password};

    return new Promise((resolve, reject) => {
      this.http.post(`${URL}/user/login`, data)
      .subscribe( async resp => {
        if (resp['ok']) {
          await this.guardarToken(resp['token']);
          resolve();
        } else {
          this.token = null;
          this.storage.clear();
          reject(resp['mensaje']);
        }
      });
    });
  }

  cambiarIdioma(idioma){
      console.log(idioma);
      this.translateService.use(idioma); 
  }

  sacarConfigUsuario(){

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise((resolve, reject) => {
      this.http.get(`${URL}/user/config`, {headers})
      .subscribe( async resp => {
        if (resp['ok']) {
          this.usuario.config = resp['config'];
          this.cambiarIdioma(this.usuario.config.idioma);
          resolve();
        } else {
          reject();
        }
      });
    });

  }

  logout() {
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', {animated: true});
  }

  registro(usuario: Usuario) {

    return new Promise((resolve, reject) => {
      this.http.post(`${URL}/user/create`, usuario)
      .subscribe( async resp => {
        if (resp['ok']) {
          await this.guardarToken(resp['token']);
          resolve();
        } else {
          this.token = null;
          this.storage.clear();
          reject(resp['mensaje']);
        }
      });
    });

  }

  getUsuario() {

    if (this.usuario._id) {
      this.validaToken();
    }

    return {...this.usuario};
  }

  async guardarToken(token: string) {

    this.token = token;
    await this.storage.set('token', token);

    await this.validaToken();

  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${URL}/user/`, {headers})
      .subscribe(resp => {
        if (resp['ok']) {
          this.usuario = resp['usuario'];
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  actualizarUsuario( usuario: Usuario) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve => {
      this.http.post(`${URL}/user/update`, usuario, {headers})
      .subscribe(resp => {
        if (resp['ok']) {
          this.guardarToken(resp['token']);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  getIdioma(){
    return this.usuario.config.idioma;
  }


}
