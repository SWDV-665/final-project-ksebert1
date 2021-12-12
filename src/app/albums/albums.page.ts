import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/core/models/pet.model';
import { PictureService } from 'src/app/core/services/picture.service';
import { PetsService } from '../core/services/pets.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
})
export class AlbumsPage implements OnInit {
  pet: Pet;
  petImage: string;
 

  constructor(private pictureService: PictureService,  public store: PetsService,) { }

  ngOnInit() {
  }

  async takePicture() {
    try{
      // const imageStr = await this.pictureService.getPicture(this.petImage);
      const imageStr = await this.pictureService.getPicture();
      this.petImage = imageStr;
    } catch(err){
      console.log(err);
    }

  }


}
