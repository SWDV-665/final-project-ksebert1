import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { MobxAngularModule } from 'mobx-angular';
import {  ManagePetComponent } from './components/manage-pet/manage-pet.component';
import { ManagePhotosComponent } from '../albums/components/manage-photos/manage-photos.component';
import { ManageVetsComponent } from '../vet/components/manage-vets/manage-vets.component';
import { PetsFiltersPopoverComponent } from './components/pets-filters-popover/pets-filters-popover.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    MobxAngularModule
  ],
  entryComponents : [ManagePetComponent, PetsFiltersPopoverComponent, ManagePhotosComponent, ManageVetsComponent],
  declarations: [HomePage,ManagePhotosComponent, ManageVetsComponent, ManagePetComponent, PetsFiltersPopoverComponent]
})
export class HomePageModule {}
