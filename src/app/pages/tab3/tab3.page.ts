import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario:Usuario ={}

  constructor(private UsuarioService: UsuarioService, private uiService:UiServiceService, private postService: PostsService){}

  ngOnInit(){
    this.usuario = this.UsuarioService.getUsuario();
  }

  async actualizar( fActualizar: NgForm){
    if(fActualizar.invalid){return;}

    const actualizado = await this.UsuarioService.actualizarUsuario(this.usuario);
    console.log(actualizado)
    if(actualizado){
      this.uiService.presentToast('Usuario actualizado correctamente');
    }else{
      this.uiService.presentToast('Usuario no actualizado');
    }
  }

  logout(){
    this.postService.paginaPosts = 0;
    this.UsuarioService.logout();
  }
}
