import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/core/models/pet.model';
import { PictureService } from 'src/app/core/services/picture.service';
import { PetsService } from '../core/services/pets.service';
import { PhotosFilters } from '../core/constants/photos-filters.enum';
import { Photos } from '../core/models/photo.model';
import { PhotosService } from '../core/services/photos.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
})
export class AlbumsPage implements OnInit {
  pet: Pet;
  photo: Photos;
  petImage: string;
 

  constructor(private pictureService: PictureService, private photoService: PhotosService,public store: PetsService) { }

  ngOnInit() {
  }

  async AddPhoto() {
    try{
      // const imageStr = await this.pictureService.getPicture(this.petImage);
      const imageStr = await this.pictureService.getPicture();
      // this.petImage = imageStr;
    } catch(err){
      console.log(err);
    }

  }


}
