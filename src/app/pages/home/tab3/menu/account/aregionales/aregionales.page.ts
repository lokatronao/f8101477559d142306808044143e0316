import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-aregionales',
  templateUrl: './aregionales.page.html',
  styleUrls: ['./aregionales.page.scss'],
})
export class AregionalesPage implements OnInit {

  usuario: Usuario = { };

  constructor(private usuarioService: UsuarioService,
    private uiService: UiServiceService) { }

    ngOnInit() {
      this.usuario = this.usuarioService.getUsuario();
    }
  
    async actualizar( fActualizar: NgForm) {
      console.log(this.usuario);
      if (fActualizar.invalid) { return; }
  
      const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);
      if (actualizado) {
        this.uiService.presentToast('Usuario actualizado correctamente');
      } else {
        this.uiService.presentToast('Usuario no actualizado');
      }
    }

    idiomaSeleccionado(event){
      this.usuario.config.pais = event['alpha2'];
      console.log(this.usuario.config.pais);
      this.usuario.config.idioma = event['alpha2'];
    }

}
