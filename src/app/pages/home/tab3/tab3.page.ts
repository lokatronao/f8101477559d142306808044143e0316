import { Component, OnInit} from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../../services/ui-service.service';
import { PostsService } from 'src/app/services/posts.service';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = { };

  constructor(private usuarioService: UsuarioService,
    private uiService: UiServiceService,
    private postService: PostsService,
    private menuController: MenuController,
    private navCtrl: NavController) { }

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

  logout() {
    this.postService.paginaPosts = 0;
    this.usuarioService.logout();
  }

  openMenu() {
    this.menuController.open('options');
  }

  account() {
    this.navCtrl.navigateRoot('/main/tabs/tab3/account', {animated: true});
  }
}
