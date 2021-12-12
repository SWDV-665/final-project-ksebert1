
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalController, PopoverController} from '@ionic/angular';
import { PetsFilters } from '../core/constants/pets-filters.enum';
import { Vet } from '../core/models/vet.model';
import { VetsService } from '../core/services/vets.service';
import {ManageVetsComponent, VetManageModes} from './components/manage-vets/manage-vets.component'


@Component({
  selector: 'app-vet-manage-vets',
  templateUrl: './vet.page.html',
  styleUrls: ['./vet.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VetPage implements OnInit {
  constructor(
    public vetStore: VetsService,
    public modalController: ModalController,
    public popoverController: PopoverController
    ) { }

  ngOnInit() {

  }

  
  archiveVet(vet: Vet){
    this.vetStore.archiveVet(vet);
  };



  async createVet() {
    const modal = await this.modalController.create({
      component: ManageVetsComponent,
      componentProps: {
        mode: VetManageModes.ADD,
        pet: null
      }
    });
    await modal.present();
    const response = await modal.onDidDismiss();
    const vet = response.data as Vet;
    if (vet){
      this.vetStore.createVet(vet);
      window.location.reload();
    }

  }

    async editVet(vetItem: Vet){
      const modal = await this.modalController.create({
        component: ManageVetsComponent,
        componentProps: {
          mode: VetManageModes.EDIT,
          vet: vetItem
        }
      });
      await modal.present();
      const response = await modal.onDidDismiss();
      const vet = response.data as Vet;
      if (vet){
        this.vetStore.updateVet(vet);
            window.location.reload();
      }


    }

  }
