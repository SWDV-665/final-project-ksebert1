import { observable, action } from "mobx-angular";

//Creating an interface for Pet
export interface IPet {
    id: number;
    name: string;
    species: string;
    birthday: Date;
    breed: string;
    color: string;
    description: string;
    adopted: Date;
    sex: string;
    altered: boolean;
    microchipped: boolean;
    archived: boolean;
    photo: object;
    imagePath: string;
}

export class Pet implements IPet{
    id: number;
    name: string;
   @observable species: string;
    birthday: Date;
    breed: string;
    color: string;
    description: string;
    adopted: Date;
    sex: string;
    altered: boolean;
    microchipped: boolean;
    @observable archived: boolean;
    photo: object;
    @observable imagePath: string;

    //the constructor might be passed values for pet, if not it sets defaults.
    constructor (pet: Partial<IPet>){
        this.id = pet.id ? pet.id : new Date().getTime();
        this.name = pet.name ? pet.name : "";
        // this.species = pet.species ? pet.species : "";
        this.setSpecies(pet.species ? pet.species : "");
        this.birthday = pet.birthday ? pet.birthday : new Date;
        this.breed = pet.breed ? pet.breed : "";
        this.color = pet.color ? pet.color : "";
        this.description = pet.description ? pet.description : "";
        this.adopted = pet.adopted ? pet.adopted : new Date;
        this.sex = pet.sex ? pet.sex : "";
        this.altered = pet.altered !== undefined ? pet.altered: false;
        this.microchipped = pet.microchipped !== undefined ? pet.microchipped : false;
        this.setArchived(pet.archived !== undefined ? pet.archived : false)
        this.photo = pet.photo !== undefined ? pet.photo : new Object;
        this.setImagepath(pet.imagePath ? pet.imagePath : '')
    }

    @action
    setSpecies(value){
        this.species = value;
    }


    @action
    setArchived(value){
        this.archived = value;
    }

    @action
    setImagepath(imagePath){
        this.imagePath = imagePath;
    }

}
