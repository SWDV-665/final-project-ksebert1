import { observable, action } from "mobx-angular";
import { Pet } from "./pet.model";

//Creating an interface for Vets
export interface IVet {
    id: number;
    // petid: number;
    name: string;
    phone: string;
    email: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    vfn: string;
    vmn: string;
    vln: string;
    description: string;
    archived: boolean;
}

export class Vet implements IVet{
    id: number;
    // petid: number;
    name: string;
    phone: string;
    email: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    vfn: string;
    vmn: string;
    vln: string;
    description: string;
    @observable archived: boolean;

    //the constructor might be passed values for Vet, if not it sets defaults.
    constructor (vet: Partial<IVet>){
        this.id = (vet.id ? vet.id : new Date().getTime());
        this.name = ( vet.name ? vet.name :'');
        this.phone = ( vet.phone ? vet.phone :'');
        this.email = ( vet.email ? vet.email :'');
        this.address1 = ( vet.address1 ? vet.address1 :'');
        this.address2 = ( vet.address2 ? vet.address2 :'');
        this.city = ( vet.city ? vet.city :'');
        this.state =( vet.state ? vet.state :'');
        this.zip = (vet.zip ? vet.zip :  '');
        this.vfn = (vet.vfn ? vet.vfn :  '');
        this.vmn = (vet.vmn ? vet.vmn :  '');
        this.vln = (vet.vln ? vet.vln :  '');
        this.description = vet.description ? vet.description : "";
        this.setArchived(vet.archived  ? vet.archived : false)
    }

    // @action
    // setPetId(value){
    //     this.petid = value;
    // }

    // @action
    // setVetId(value){
    //     this.petid = value;
    // }

    @action
    setArchived(value){
        this.archived = value;

    }


}
