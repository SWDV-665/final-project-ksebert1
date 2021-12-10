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
    gender: string;
    altered: boolean;
    microchipped: boolean;
    archived: boolean
}

export class Pet implements IPet{
    id: number;
    name: string;
    species: string;
    birthday: Date;
    breed: string;
    color: string;
    description: string;
    adopted: Date;
    gender: string;
    altered: boolean;
    microchipped: boolean;
    archived: boolean

    //the constructor might be passed values for pet, if not it sets defaults.
    constructor (pet: Partial<IPet>){
        this.id = pet.id ? pet.id : new Date().getTime();
        this.name = pet.name ? pet.name : "";
        this.species = pet.species ? pet.species : "";
        this.birthday = pet.birthday ? pet.birthday : new Date;
        this.breed = pet.breed ? pet.breed : "";
        this.color = pet.color ? pet.color : "";
        this.description = pet.description ? pet.description : "";
        this.adopted = pet.adopted ? pet.adopted : new Date;
        this.gender = pet.gender ? pet.gender : "";
        this.altered = pet.altered !== undefined ? pet.altered: false;
        this.microchipped = pet.microchipped !== undefined ? pet.microchipped : false;
        this.archived = pet.archived !== undefined ? pet.archived : false;
    }

}