import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: Post = {};

  showGPS = false;

  sameLanguage = true;

  translation = '';
  showTranslation = false;

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  }

  constructor(private usuarioService: UsuarioService, private translateService: TranslateService) { }

  ngOnInit() {
    if (this.post.mensaje.idioma && this.post.mensaje.idioma !== this.usuarioService.getIdioma()) {
      this.sameLanguage = false;
    }
  }

  traducirPost() {
    if(this.translation === ''){
      this.translateService.traducir(this.post.mensaje.texto, this.usuarioService.getIdioma())
      .then(resp => {
        this.translation = resp['translation'];
      })
      .catch(resp => {
        console.log(resp);
      });
      this.showTranslation = true;
    } else {
      this.showTranslation = true;
    }
  }

  showOriginal() {
    this.showTranslation = false;
  }

}
