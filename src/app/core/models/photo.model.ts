import { observable, action } from "mobx-angular";
import { Pet } from "./pet.model";

//Creating an interface for Photos
export interface IPhoto {
    id: number;
    petid: number;
    name: string;
    date: Date;
    description: string;
    imagePath: string;
    archived: boolean;
}

export class Photos implements IPhoto{
    id: number;
    @observable  petid: number;
    name: string;
    date: Date;
    description: string;
    imagePath: string;
    @observable archived: boolean;

    //the constructor might be passed values for photo, if not it sets defaults.
    constructor (photo: Partial<IPhoto>){
        this.id = photo.id ? photo.id : new Date().getTime();
        this.setPetId( photo.petid ? photo.petid :0);
        this.name = photo.name ? photo.name : "";
        this.date = photo.date ? photo.date : new Date;
        this.description = photo.description ? photo.description : "";
        this.setImagepath(photo.imagePath ? photo.imagePath : '');
        this.setArchived(photo.archived  ? photo.archived : false)
    }

    @action
    setPetId(value){
        this.petid = value;
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
