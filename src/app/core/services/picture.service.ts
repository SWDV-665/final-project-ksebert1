import { Injectable } from '@angular/core';
import {Camera, CameraOptions, PictureSourceType} from '@ionic-native/camera/ngx'
@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private camera: Camera) { }

  // async getPicture(existingImage = null): Promise<string>
  async getPicture(){
  // return new Promise(async (resolve, reject) =>{
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    try{
      const imageData = await this.camera.getPicture(options);
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      return base64Image;
    } catch(err){
        console.log(err)
      return null;
    }

  }
}
