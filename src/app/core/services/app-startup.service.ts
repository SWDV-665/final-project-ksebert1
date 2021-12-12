import { Injectable } from '@angular/core';
import { PetsService } from './pets.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppStartupService {

  constructor(
    private storageService: StorageService,
    private petsService: PetsService,

  ) { }

  async doStartUpTasks(){
    await this.storageService.init();
    this.petsService.initPets();
 }
}
   
 export function startupServiceFactory(
   startupService: AppStartupService
   ): Function{
      return () => {
       return startupService.doStartUpTasks();
     }
   }
 




 

