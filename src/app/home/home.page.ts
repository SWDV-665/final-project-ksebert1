
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { Pet } from '../core/models/pet.model';
import { PetsService } from '../core/services/pets.service';
import { ManagePetComponent, PetManageModes } from './components/manage-pet/manage-pet.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
  constructor(
    public store: PetsService,
    public modalController: ModalController
    ) { }

  ngOnInit() {
  }
  
  archivePet(pet: Pet){
    this.store.archivePet(pet);
  };

  async createPet() {
    const modal = await this.modalController.create({
      component: ManagePetComponent,
      componentProps: {
        mode: PetManageModes.ADD,
        pet: null
      }
    });
    await modal.present();
    const response = await modal.onDidDismiss();
    console.log(response);
    const pet = response.data as Pet;
    if (pet){
      this.store.createPet(pet);
    }


    }

    async editPet(petItem: Pet){
      const modal = await this.modalController.create({
        component: ManagePetComponent,
        componentProps: {
          mode: PetManageModes.EDIT,
          pet: petItem
        }
      });
      await modal.present();
      const response = await modal.onDidDismiss();
      const pet = response.data as Pet;
      if (pet){
        this.store.createPet(pet);
      }


    }

  }
