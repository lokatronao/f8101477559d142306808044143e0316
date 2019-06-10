import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PostsService } from 'src/app/services/posts.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import {UiServiceService} from '../../../../../../services/ui-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-agenerales',
  templateUrl: './agenerales.page.html',
  styleUrls: ['./agenerales.page.scss'],
})
export class AgeneralesPage implements OnInit {

  usuario: Usuario = { };

  constructor(private usuarioService: UsuarioService,
    private uiService: UiServiceService) { }

    ngOnInit() {
      this.usuario = this.usuarioService.getUsuario();
    }
  
    async actualizar( fActualizar: NgForm) {
      if (fActualizar.invalid) { return; }
  
      const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);
      if (actualizado) {
        this.uiService.presentToast('Usuario actualizado correctamente');
      } else {
        this.uiService.presentToast('Usuario no actualizado');
      }
    }
}
