import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, EmailValidator } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import { TranslateService } from '@ngx-translate/core';
import { Pais } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  validando = false;
  valido = false;

  errorMensajeLogin = '';
  errorMensajeRegistro = '';

  loginUser = {
    email: 'lokatronao@gmail.com',
    password: 'Habbon123,'
  };

  registerUser: Usuario = {
    email: '',
    password: '',
    config: {
      pais: '',
      idioma: ''
    },
    nombre: '',
    nickname: '',
    avatar: 'av-1.png'
  };

  constructor(private uiService: UiServiceService,
    private UsuarioService: UsuarioService,
    private navCtrl: NavController,
    private _translate: TranslateService) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    if (fLogin.invalid) { return; }
    this.validando = true;
    await this.UsuarioService.login(this.loginUser.email, this.loginUser.password)
    .then(() => {
      this.validando = false;
      this.navCtrl.navigateRoot('main/tabs/tab1', {animated: true});
      this.UsuarioService.sacarConfigUsuario();
      this.limpiarMensajesError();
    })
    .catch((err) => {
      if (err['name'] === 'HttpErrorResponse') {
        this.validando = false;
        this.errorMensajeLogin = 'No se ha podido contactar con el servidor, intentalo más tarde';
      } else {
        this.validando = false;
        this.errorMensajeLogin = err;
      }
    });
  }

  traducir(){
    this._translate.use('en');
  }

  validarDatos(){
    console.log(this.registerUser);
    if(
      this.registerUser.email !== '' &&
      this.registerUser.nombre !== '' &&
      this.registerUser.nickname !== '' &&
      this.registerUser.password !== '' &&
      this.registerUser.avatar !== '' &&
      this.registerUser.config.pais !== ''
      ){
      this.valido = true;
    }else{
      this.valido = false;
    }
  }

  idiomaSeleccionado(event){
    this.registerUser.config.pais = event['alpha2'];
    this.registerUser.config.idioma = event['alpha2'];
  }

  async registro(fRegistro: NgForm){

    if(fRegistro.invalid){return;}

    await this.UsuarioService.registro(this.registerUser)
    .then(() => {
      this.navCtrl.navigateRoot('main/tabs/tab1',{animated:true});
      this.limpiarMensajesError();
    })
    .catch((err) => {
      this.errorMensajeRegistro = err;
    });
  }

  cambiaIdioma(idioma: string) {
    this._translate.use(idioma);
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  private limpiarMensajesError() {
    this.errorMensajeRegistro = '';
    this.errorMensajeLogin = '';
  }

}
