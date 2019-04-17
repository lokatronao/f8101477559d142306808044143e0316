import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, bucketId: string): string {
    console.log(`${URL}/bucket/image/${bucketId}/${img}`);
    return `${URL}/bucket/image/${bucketId}/${img}`;
  }

}
