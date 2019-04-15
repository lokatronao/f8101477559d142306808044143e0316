import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  validando = false;

  errorMensajeLogin = '';
  errorMensajeRegistro = '';

  loginUser = {
    email: 'lokatronao@gmail.com',
    password: 'Habbon123,'
  };

  registerUser: Usuario = {
    email: '',
    password: '',
    nombre: '',
    avatar: 'av-1.png'
  };

  constructor(private uiService: UiServiceService , private UsuarioService: UsuarioService, private navCtrl: NavController) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm){
    if(fLogin.invalid){return;};
    this.validando = true;
    await this.UsuarioService.login(this.loginUser.email, this.loginUser.password)
    .then(()=>{
      this.validando= false;
      this.navCtrl.navigateRoot('main/tabs/tab1',{animated:true});
      this.limpiarMensajesError();
    })
    .catch((err)=>{
      this.validando = false;
      this.errorMensajeLogin = err;
    });
  }

  async registro(fRegistro: NgForm){

    if(fRegistro.invalid){return;}

    await this.UsuarioService.registro(this.registerUser)
    .then(()=>{
      this.navCtrl.navigateRoot('main/tabs/tab1',{animated:true});
      this.limpiarMensajesError();
    })
    .catch((err)=>{
      this.errorMensajeRegistro = err;
    });
  }

  mostrarRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  private limpiarMensajesError(){
    this.errorMensajeRegistro = '';
    this.errorMensajeLogin = '';
  }

}
