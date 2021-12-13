import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Photos } from 'src/app/core/models/photo.model';
import { PictureService } from 'src/app/core/services/picture.service';

export enum PhotoManageModes {
  ADD = 'add',
  EDIT = 'edit'
};
@Component({
  selector: 'app-manage-photos',
  templateUrl: './manage-photos.component.html',
  styleUrls: ['./manage-photos.component.scss'],
})
export class ManagePhotosComponent implements OnInit {
  photoForm: FormGroup;
  mode: PhotoManageModes = PhotoManageModes.ADD;
  photo: Photos;
  manageModes = PhotoManageModes;
  petImage: string;
  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private pictureService: PictureService
  ) { }

  ngOnInit() {
    this.photoForm = this.fb.group({
      petid: ['', String],
      name: ['',[Validators.required]],
      date: ['', Date],
      description: ['',[] ],
      imagePath : ['',String],
      archived: ['', Boolean],
          
    });
    if(this.photo && this.mode === this.manageModes.EDIT){
      this.photoForm.get('name').setValue(this.photo.name);
      this.photoForm.get('date').setValue(this.photo.date);
      this.photoForm.get('description').setValue(this.photo.description);
      this.photoForm.get('imagePath').setValue(this.photo.imagePath);
      this.photoForm.get('archived').setValue(this.photo.archived);
      // this.petImage = this.photo.imagePath ? this.pet.imagePath : '';
    }

  }

  async takePicture() {
    try{
      // const imageStr = await this.pictureService.getPicture(this.petImage);
      const imageStr = await this.pictureService.getPicture();
      this.petImage = imageStr;
    } catch(err){
      console.log(err);
    }

  }

  async formSubmit(){
    console.log(this.photoForm.value);
    let params = '';
    if (this.mode === this.manageModes.ADD){
      params = {
        ...this.photoForm.value,
       };
    } else {
      params = {
        ...this.photo,
        ...this.photoForm.value,
      };
    }
    this.modalController.dismiss(params);

  }

  async dismiss(){
    this.modalController.dismiss();
  }

}
