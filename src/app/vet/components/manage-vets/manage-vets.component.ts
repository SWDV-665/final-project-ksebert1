import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vet } from 'src/app/core/models/vet.model';

export enum VetManageModes {
  ADD = 'add',
  EDIT = 'edit'
};

@Component({
  selector: 'app-manage-vets',
  templateUrl: './manage-vets.component.html',
  styleUrls: ['./manage-vets.component.scss'],
})
export class ManageVetsComponent implements OnInit {
  vetForm: FormGroup;
  mode: VetManageModes = VetManageModes.ADD;
  vet: Vet;
  manageModes = VetManageModes;

  constructor(
    public modalController: ModalController,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
  this.vetForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', []]
  });
  if (this.vet && this.mode === this.manageModes.EDIT) {
    this.vetForm.get('name').setValue(this.vet.name);
    this.vetForm.get('phone').setValue(this.vet.phone);
    this.vetForm.get('email').setValue(this.vet.email);
    this.vetForm.get('address1').setValue(this.vet.address1);
    this.vetForm.get('address2').setValue(this.vet.address2);
    this.vetForm.get('city').setValue(this.vet.city);
    this.vetForm.get('state').setValue(this.vet.state);
    this.vetForm.get('zip').setValue(this.vet.zip);
    this.vetForm.get('vfn').setValue(this.vet.vfn);
    this.vetForm.get('vmn').setValue(this.vet.vmn);
    this.vetForm.get('vln').setValue(this.vet.vln);
    this.vetForm.get('description').setValue(this.vet.description);
    this.vetForm.get('vmn').setValue(this.vet.vmn);
    this.vetForm.get('archived').setValue(this.vet.archived);

  }


}

  formSubmit() {
    let params;
    if (this.mode === this.manageModes.ADD) {
      params = {
        ...this.vetForm.value,
      };
    } else {
      params = {
        ...this.vet,
        ...this.vetForm.value,
      };
    }
    this.modalController.dismiss(params);
  }

  dismiss() {
    this.modalController.dismiss();
  }

}

