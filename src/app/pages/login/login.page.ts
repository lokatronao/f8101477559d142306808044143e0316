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

  loginUser = {
    email: 'lokatronao@gmail.com',
    password: 'Habbon123,'
  };

  registerUser: Usuario = {
    email: 'test@test.com',
    password: '123456',
    nombre: 'Test',
    avatar: 'av-1.png'
  };

  constructor(private uiService: UiServiceService , private UsuarioService: UsuarioService, private navCtrl: NavController) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm){
    if(fLogin.invalid){return;};
    this.validando = true;
    const valido = await this.UsuarioService.login(this.loginUser.email, this.loginUser.password);
    if(valido){
      //navegar al tabs
      this.validando= false;
      this.navCtrl.navigateRoot('main/tabs/tab1',{animated:true});
    }else{
      this.validando = false;
      //mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('Usuario/Contraseña no son correctos');
    }

  }

  async registro(fRegistro: NgForm){

    if(fRegistro.invalid){return;}

    const valido = await this.UsuarioService.registro(this.registerUser);

    if(valido){
      //navegar al tabs
      this.navCtrl.navigateRoot('main/tabs/tab1',{animated:true});
    }else{
      //mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('Ese correo electrónico ya existe');
    }
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

}
