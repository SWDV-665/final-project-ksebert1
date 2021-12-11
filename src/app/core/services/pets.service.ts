import { Injectable } from '@angular/core';
import { action, computed, observable } from 'mobx-angular';
import { PetsFilters } from '../constants/pets-filters.enum';
import { IPet, Pet } from '../models/pet.model';
import { SqliteStorageService } from './sqlite-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  tableName = 'pets';
  @observable pets: Array<Pet>;
  @observable filter: PetsFilters;

  constructor(
    private sqliteStorage: SqliteStorageService
  ) { 
  
  }

  @action
  initPets(){
  this.pets = [];
  this.filter = PetsFilters.ALL;
  this.getAllPets();
  }

  async getAllPets(){
    const pets = await this.sqliteStorage.getAll(this.tableName);
    this.setPets(pets);
  }

  @action
  setPets(pets: Array<Pet>){
    this.pets = pets;
    console.log("pets retrieved", this.pets)
  }

  @action
  setFilter(filter: PetsFilters){
  this.filter = filter;
  
  };



  @action
  archivePet(pet: Pet){
    pet.archived = true;
  console.log(JSON.stringify(pet) + " was archived")
  };

  @action
  createPet(pet:Partial<IPet>) {
    this.pets.push(new Pet(pet));
  console.log('Added a new pet.')
  }

  @action
  updatePet(pet:Pet) {
    console.log("updating: " + JSON.stringify(pet))
    for (let i = 0, len = this.pets.length; i < len; ++i){
      if (pet.id === this.pets[i].id){
        this.pets[i] = pet;
        break;
      }
    }
  }

  @computed
  get archivedPetCount(){
    return this.pets.filter((pet) => !!pet.archived).length;
  }

  @computed
  get filteredPets(){
    console.log("filter: " + this.filter);
    switch (this.filter){
      case PetsFilters.ALL:
        return this.pets
      case PetsFilters.AMPHIBIANS:
        return this.pets.filter(pet => pet["species"] == "amphibian")
      case PetsFilters.CATS:
        return this.pets.filter(pet => pet["species"] == "cat")
      case PetsFilters.DOGS:
        return this.pets.filter(pet => pet["species"] == "dog")
      case PetsFilters.BIRDS:
        return this.pets.filter(pet => pet["species"] == "bird")
    }
  }

}
