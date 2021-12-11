import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { MobxAngularModule } from 'mobx-angular';
import {  ManagePetComponent } from './components/manage-pet/manage-pet.component';
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
  entryComponents : [ManagePetComponent, PetsFiltersPopoverComponent],
  declarations: [HomePage, ManagePetComponent, PetsFiltersPopoverComponent]
})
export class HomePageModule {}
