import { Component, OnInit} from '@angular/core';
import { Usuario, Post } from 'src/app/interfaces/interfaces';
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

  posts: Post[] = [];

  habilitado: boolean = true;

  usuario: Usuario = { };

  constructor(private usuarioService: UsuarioService,
    private uiService: UiServiceService,
    private postService: PostsService,
    private menuController: MenuController,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    this.siguientes();
    this.postService.nuevoPost
    .subscribe(post => {
      this.posts.unshift(post);
    });
  }

  recargar( event ) {

    this.siguientes(event, true);
    this.posts = [];
    this.habilitado = true;
    console.log(this.posts);

  }

  siguientes( event?, pull: boolean = false ){

    this.postService.getPostsPropios(pull)
    .subscribe(resp => {
      console.log(resp);
      this.posts.push(...resp.posts);

      if (event) {
        event.target.complete();

        if (resp.posts.length === 0) {
          this.habilitado = false;
        }
      }

    });
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
