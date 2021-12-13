import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalController, PopoverController} from '@ionic/angular';
import { Pet } from 'src/app/core/models/pet.model';
import { PictureService } from 'src/app/core/services/picture.service';
import { PetsService } from '../core/services/pets.service';
import { PhotosFilters } from '../core/constants/photos-filters.enum';
import { Photos } from '../core/models/photo.model';
import { PhotosService } from '../core/services/photos.service';
import { StorageService } from '../core/services/storage.service';
import { ManagePhotosComponent, PhotoManageModes } from './components/manage-photos/manage-photos.component';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsPage implements OnInit {
  constructor(
    public store: PetsService,
    public photoStore : PhotosService,
     public pictureService: PictureService,
    public modalController: ModalController,
    public popoverController: PopoverController,
    public photoService: PhotosService,
    private storage: StorageService) 
    { }



  ngOnInit() {
  
  }

  async AddPhoto() {

      const imageStr = await this.pictureService.getPicture();
      this.photoService
    } catch(err){
      console.log(err);
    }

    
  archivePhoto(Photo: Photos){
    this.photoService.archivePhoto(Photo);
  };

  async createPhoto() {
    console.log("in create photo")
    const modal = await this.modalController.create({
      component: ManagePhotosComponent,
      componentProps: {
        mode: PhotoManageModes.ADD,
        pet: null
      }
    });
    await modal.present();
    const response = await modal.onDidDismiss();
    const photo = response.data as Photos;
    if (photo){
      this.photoService.createPhoto(photo);
      window.location.reload();
    }

  }

}


