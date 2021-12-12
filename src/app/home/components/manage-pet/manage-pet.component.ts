import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Pet } from 'src/app/core/models/pet.model';

export enum PetManageModes {
  ADD = 'add',
  EDIT = 'edit'
};

@Component({
  selector: 'app-manage-pet',
  templateUrl: './manage-pet.component.html',
  styleUrls: ['./manage-pet.component.scss'],
})
export class ManagePetComponent  implements OnInit {
  petForm: FormGroup;
  mode: PetManageModes = PetManageModes.ADD;
  pet: Pet;
  manageModes = PetManageModes;
  constructor(
    public modalController: ModalController,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.petForm = this.fb.group({
      name: ['',[Validators.required]],
      species: ['', [Validators.required]],
      birthday: ['', Date],
      breed: ['', String],
      color: ['',String ],
      description: ['',[] ],
      adopted: ['', Date],
      sex: ['', Boolean],
      altered: ['',Boolean ],
      microchipped: ['', Boolean],
      photo: ['', []],
    });

    if(this.pet && this.mode === this.manageModes.EDIT){
      this.petForm.get('name').setValue(this.pet.name);
      this.petForm.get('species').setValue(this.pet.species);
      this.petForm.get('birthday').setValue(this.pet.birthday);
      this.petForm.get('breed').setValue(this.pet.breed);
      this.petForm.get('color').setValue(this.pet.color);
      this.petForm.get('description').setValue(this.pet.description);
      this.petForm.get('adopted').setValue(this.pet.adopted);
      this.petForm.get('sex').setValue(this.pet.sex);
      this.petForm.get('altered').setValue(this.pet.altered);
      this.petForm.get('microchipped').setValue(this.pet.microchipped);
      this.petForm.get('photo').setValue(this.pet.photo);
    }
  }

  formSubmit(){
    console.log(this.petForm.value);
    let params = '';
    if (this.mode === this.manageModes.ADD){
      params = this.petForm.value;
    } else {
      params = {
        ...this.pet,
        ...this.petForm.value
      };
    }
    this.modalController.dismiss(params);

  }

  dismiss(){
    this.modalController.dismiss();
  }



}
