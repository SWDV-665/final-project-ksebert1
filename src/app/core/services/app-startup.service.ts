import { Injectable } from '@angular/core';
import { PetsService } from './pets.service';
import { StorageService } from './storage.service';
import { PhotosService } from './photos.service';

@Injectable({
  providedIn: 'root'
})
export class AppStartupService {

  constructor(
    private storageService: StorageService,
    private petsService: PetsService,
    private photoService : PhotosService

  ) { }

  async doStartUpTasks(){
    console.log("doing startup tasks")
    await this.storageService.init();
    this.petsService.initPets();
    this.photoService.initPhotos();
    
 }
}
   
 export function startupServiceFactory(
   startupService: AppStartupService
   ): Function{
      return () => {
       return startupService.doStartUpTasks();
     }
   }
 




 

