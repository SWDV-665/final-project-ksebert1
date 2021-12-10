import { Injectable } from '@angular/core';
import { action, computed, observable } from 'mobx-angular';
import { IPet, Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  @observable pets: Array<Pet>;

  constructor() { 
  this.initPet();
  }

  @action
  initPet(){
  this.pets = [];
  };

  @action
  archivePet(pet: Pet){
  pet.archived = true;
  console.log(JSON.stringify(pet) +" was archived")
  };

  @action
  createPet(pet:Partial<IPet>) {
  this.pets.push(new Pet({
    name: 'My New Pet',
    archived: false
  }));
  console.log('Added a new pet')
  }

  @computed
  get archivedPetCount(){
    return this.pets.filter((pet) => !!pet.archived).length;
  }


}
