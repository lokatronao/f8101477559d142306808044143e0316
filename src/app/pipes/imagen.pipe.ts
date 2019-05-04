import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, bucketId: string): string {
    return `${URL}/bucket/image/${bucketId}/${img}`;
  }

}
