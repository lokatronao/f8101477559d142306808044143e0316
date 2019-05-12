import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  nuevoPost = new EventEmitter<Post>();

  constructor( private http: HttpClient, private usuarioService: UsuarioService, private fileTransfer: FileTransfer ) { }

  getPosts( pull: boolean = false ) {

    if (pull) {
      this.paginaPosts = 0;
    }

    this.paginaPosts++;

    return this.http.get<RespuestaPosts>(`${URL}/posts/?pagina=${this.paginaPosts}`);
  }

  crearPost(post) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/posts`, post, {headers})
      .subscribe(resp => {
        console.log(resp);
        this.nuevoPost.emit(resp['post']);
        resolve(true);
      });
    });
  }

  subirImagen(img: string) {
    const options: FileUploadOptions = {
      fileKey: 'imagen',
      headers: {
        'x-token': this.usuarioService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    return new Promise((resolve, reject) => {
      fileTransfer.upload( img, `${URL}/posts/upload`, options )
      .then(data => {
        resolve(data);
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    });
  }

}
