
import { Injectable } from '@angular/core';
import { action, computed, observable } from 'mobx-angular';
import { PetsFilters } from '../constants/pets-filters.enum';
import { IPet, Pet } from '../models/pet.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

//constructor no longer needed because this is an extension of StorageService
export class PetsService extends StorageService {
  tableName = 'pets';
  petFields = ['name', 'species', 'birthday', 'breed', 'color', 'description', 'adopted', 'sex', 'altered','microchipped','archived', 'photo', 'imagePath'];
  
  @observable pets: Array<Pet>;
  @observable filter: PetsFilters;

  @action
  initPets(){
  this.pets = [];
  this.filter = PetsFilters.ALL;
  this.getAllPets();
  }

  async getAllPets(){
    const pets = await super.getAll(this.tableName);
    console.log("This is get all pets: " , JSON.stringify(pets));
    this.setPets(pets.map(pet => new Pet(pet))); //converting what we receive from SQLite into a class Pet object.
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
  async archivePet(pet: Pet){
    pet.setArchived(true);
    await super.update(
      this.tableName,
      pet.id,
      this.petFields,
      [pet.name, pet.species, pet.birthday, pet.breed, pet.color, pet.description, pet.adopted , pet.sex , pet.altered , pet.microchipped , pet.archived ? 1: 0 , pet.photo, pet.imagePath? pet.imagePath: '']
    );
    console.log(JSON.stringify(pet) + " was archived")
  };

  @action
  async createPet(pet:Partial<IPet>) {
      const response = await super.create(
      this.tableName,
      this.petFields,
      [pet.name, pet.species, pet.birthday, pet.breed, pet.color, pet.description, pet.adopted ? 1: 0 , pet.sex ? 1: 0 , pet.altered ? 1: 0 , pet.microchipped ? 1: 0 , pet.archived ? 1: 0 , pet.photo, pet.imagePath? pet.imagePath: '']

    );
    const savedPet = await super.getById(
      this.tableName,
      response.insertID
    );
    this.setPets([...this.pets, new Pet(savedPet)]);
  }

  @action
  async updatePet(pet:Pet) {
    console.log("updating: " + JSON.stringify(pet))
    await super.update(
      this.tableName,
      pet.id,
      this.petFields,
      [pet.name, pet.species, pet.birthday, pet.breed, pet.color, pet.description, pet.adopted ? 1: 0 , pet.sex ? 1: 0 , pet.altered ? 1: 0 , pet.microchipped ? 1: 0 , pet.archived ? 1: 0 , pet.photo, pet.imagePath? pet.imagePath: '']
   );
      this.setPet(new Pet(pet));
      
    
  }

  @action
  setPet(pet: Pet){
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
    console.log("Current filter: " + this.filter);
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
