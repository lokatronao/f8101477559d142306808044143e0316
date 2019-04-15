import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { NavController } from '@ionic/angular';
import { TouchSequence } from 'selenium-webdriver';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  cargandoGeo = false;
  cargando = false;

  post = {
    mensaje: '',
    coords: null,
    posicion: false
  };

  constructor(private postService: PostsService, private navCtrl: NavController, private geolocation:Geolocation, private camera: Camera){}

  async crearPost(){

    console.log(this.post);
    const creado = await this.postService.crearPost(this.post);

    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };

    this.tempImages = [];

    this.navCtrl.navigateRoot('main/tabs/tab1',{animated:true});

  }

  getGeo(){
    if(!this.post.posicion){
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;
    this.cargando = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeo = false;
      this.cargando = false;
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      console.log(coords);
      this.post.coords = coords;
     }).catch((error) => {
       console.log('Error getting location', error);
       this.cargandoGeo = false;
     });
  }
  camara(){

    this.cargando=true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.procesarImagen(options);
  }

  libreria(){

    this.cargando=true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.procesarImagen(options);
  }

  private procesarImagen(options: CameraOptions){
    this.camera.getPicture(options).then(async (imageData) => {
 
       const img = window.Ionic.WebView.convertFileSrc(imageData);
       console.log(img);
       this.tempImages.push(img);
       this.postService.subirImagen(imageData)
       .then(()=>{
        this.cargando = false;
       });
     }, (err) => {

     });
  }
}
