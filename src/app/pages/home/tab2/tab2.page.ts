import { Component } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { NavController } from '@ionic/angular';
import { TouchSequence } from 'selenium-webdriver';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { tempImage, Likelihood } from 'src/app/interfaces/interfaces';
import { BucketService } from 'src/app/services/bucket.service';
import { RespuestaSubidaBucket } from '../../../interfaces/interfaces';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: tempImage[] = [];
  cargandoGeo = false;
  cargando = false;

  post = {
    mensaje: '',
    coords: null,
    posicion: false,
    bucket: ''
  };

  constructor(private postService: PostsService,
    private bucketService: BucketService,
     private navCtrl: NavController,
      private geolocation: Geolocation,
       private camera: Camera) {
       }

  async crearPost() {

    const creado = await this.postService.crearPost(this.post);

    this.post = {
      mensaje: '',
      coords: null,
      posicion: false,
      bucket: ''
    };

    this.tempImages = [];

    this.navCtrl.navigateRoot('main/tabs/tab1', {animated: true});

  }

  getGeo() {
    if (!this.post.posicion) {
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

  camara() {
    this.cargando = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.procesarImagen(options);
  }

  libreria() {

    this.cargando = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagen(options);
  }

  private procesarImagen(options: CameraOptions) {
    if (this.post.bucket === '') {
      this.generarBucket();
    }
    this.camera.getPicture(options).then(async (imageData) => {

       const img = window.Ionic.WebView.convertFileSrc(imageData);
       const tempImage: tempImage = {path: img, subido: null };
       this.tempImages.push(tempImage);
       this.bucketService.subirImagen(imageData, this.post.bucket)
       .then((data) => {
        const response: RespuestaSubidaBucket = JSON.parse(data['response']);
        if (response.img.detections.adult === Likelihood.VERY_LIKELY) {
          tempImage.subido = false;
          console.log(data);
        } else {
          tempImage.subido = true;
        }
        this.cargando = false;
       });
     }, (err) => {
      this.cargando = false;
     });
  }

  private generarBucket() {
    this.bucketService.crear()
    .then((resp) => {
      this.post.bucket = resp['_id'];
    });
  }
}
