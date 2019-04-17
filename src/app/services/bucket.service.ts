import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  constructor( private http: HttpClient, private usuarioService: UsuarioService, private fileTransfer: FileTransfer) {}

  crear(){
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });
    console.log(this.usuarioService.token);
    return new Promise(resolve=>{
      this.http.post(`${URL}/bucket`,"",{headers})
      .subscribe(resp=>{
        console.log(resp);
        resolve(resp['bucket']);
      });
    });
  }

  subirImagen(img:string,bucketId:string){
    const options: FileUploadOptions = {
      fileKey: 'img',
      headers:{
        'x-token': this.usuarioService.token
      },
      params:{
        'bucket': bucketId
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    return new Promise((resolve,reject)=>{
      fileTransfer.upload( img, `${URL}/bucket/image/add`,options )
      .then(data =>{
        resolve(data);
      }).catch(err=>{
        console.log(err);
        reject(err);
      })
    });
  }
}
