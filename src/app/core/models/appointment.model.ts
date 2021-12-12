import { observable, action } from "mobx-angular";
import { Pet } from "./pet.model";

//Creating an interface for Appointments
export interface IAppointment {
    id: number;
    petid: number;
    vetid: number;
    date: Date;
    description: string;
    archived: boolean;
}

export class Appointment implements IAppointment{
    id: number;
    @observable petid: number;
    @observable vetid: number;
    date: Date;
    description: string;
    @observable archived: boolean;

    //the constructor might be passed values for Appointment, if not it sets defaults.
    constructor (Appointment: Partial<IAppointment>){
        this.id = Appointment.id ? Appointment.id : new Date().getTime();
        this.setPetId( Appointment.petid ? Appointment.petid :0);
        this.setVetId( Appointment.petid ? Appointment.petid :0);
        this.date = Appointment.date ? Appointment.date : new Date;
        this.description = Appointment.description ? Appointment.description : "";
        this.setArchived(Appointment.archived  ? Appointment.archived : false)
    }

    @action
    setPetId(value){
        this.petid = value;
    }
    @action
    setVetId(value){
        this.petid = value;
    }

    @action
    setArchived(value){
        this.archived = value;

    }


}
