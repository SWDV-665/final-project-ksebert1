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
export class ManagePetComponent implements OnInit {
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
      birthday: ['', ],
      breed: ['', ],
      color: ['', ],
      description: ['', ],
      adopted: ['', ],
      sex: ['', ],
      altered: ['', [Validators.required]],
      microchipped: ['', [Validators.required]],
      photo: ['', [Validators.required]],
    });
  }

  formSubmit(){
    console.log(this.petForm.value);
    this.modalController.dismiss(this.petForm.value);

  }

  dismiss(){
    this.modalController.dismiss();
  }



}
