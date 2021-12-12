
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalController, PopoverController} from '@ionic/angular';
import { PetsFilters } from '../core/constants/pets-filters.enum';
import { Pet } from '../core/models/pet.model';
import { PetsService } from '../core/services/pets.service';
import { ManagePetComponent, PetManageModes } from './components/manage-pet/manage-pet.component';
import { PetsFiltersPopoverComponent } from './components/pets-filters-popover/pets-filters-popover.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
  constructor(
    public store: PetsService,
    public modalController: ModalController,
    public popoverController: PopoverController
    ) { }

  ngOnInit() {
    this.store.createPet({
      // name: 'Sylvester',
      // species: 'cat'
    });
  }

  async showFilters(ev){
    console.log(ev + " filter selected");
    const popover = await this.popoverController.create({
      component: PetsFiltersPopoverComponent,
      event: ev,
      translucent: true,
      componentProps: {
        selectedFilter: this.store.filter
      }
    });
    await popover.present();
    const response = await popover.onDidDismiss();
    if (response.data){
      // console.log(response.data);
      this.store.setFilter(response.data as PetsFilters);

    }
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
        this.store.updatePet(pet);
      }


    }

  }
