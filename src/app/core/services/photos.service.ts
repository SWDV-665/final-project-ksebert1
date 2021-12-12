import { Injectable } from '@angular/core';
import { action, computed, observable } from 'mobx-angular';
import { PhotosFilters } from '../constants/photos-filters.enum';
import { IPhoto, Photos } from '../models/photo.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

//constructor no longer needed because this is an extension of StorageService
export class PhotosService extends StorageService {
  tableName = 'photos'; 
  photoFields = ['petid', 'name', 'date', 'description',  'imagePath', 'archived'];
  
  @observable photos: Array<Photos>;
  @observable filter: PhotosFilters;

  @action
  initPhotos(){
  this.photos = [];
  this.filter = PhotosFilters.ALL;
  this.getAllphotos();
  }

  async getAllphotos(){
    const photos = await super.getAll(this.tableName);
    console.log("This is get all photos: " , JSON.stringify(photos));
    this.setPhotos(photos.map(photo => new photo(photo))); 
  }

  @action
  setPhotos(photos: Array<Photos>){
    console.log("in set Photos")
    this.photos = photos;
    console.log("photos retrieved", this.photos)
  }

  @action
  setFilter(filter: PhotosFilters){
  this.filter = filter;  
  };

  @action
  async archivePhoto(photo: Photos){
    photo.setArchived(true);
    await super.update(
      this.tableName,
      photo.id,
      this.photoFields,
      [photo.petid, photo.name, photo.date,photo.description,  photo.imagePath? photo.imagePath: '', photo.archived ? 1: 0 ]
    );
    console.log(JSON.stringify(photo) + " was archived")
  };

  @action
  async createPet(photo:Partial<IPhoto>) {
      const response = await super.create(
      this.tableName,
      this.photoFields,
      [photo.petid, photo.name, photo.date,photo.description,  photo.imagePath? photo.imagePath: '', photo.archived ? 1: 0 ]

    );
    const savedPhoto = await super.getById(
      this.tableName,
      response.insertID
    );
    this.setPhotos([...this.photos, new Photos(savedPhoto)]);
  }

  @action
  async updatePhoto(photo:Photos) {
    console.log("updating: " + JSON.stringify(photo))
    await super.update(
      this.tableName,
      photo.id,
      this.photoFields,
      [photo.petid, photo.name, photo.date,photo.description,  photo.imagePath? photo.imagePath: '', photo.archived ? 1: 0 ]
      );
      this.setPhoto(new Photos(photo));
      
    
  }

  @action
  setPhoto(photo: Photos){
    for (let i = 0, len = this.photos.length; i < len; ++i){
      if (photo.id === this.photos[i].id){
        this.photos[i] = photo;
        break;
      }
    }
  }

  @computed
  get archivedphotoCount(){
    return this.photos.filter((photo) => !!photo.archived).length;
  }

  @computed
  get filteredphotos(){
    console.log("Current filter: " + this.filter);
    switch (this.filter){
      case PhotosFilters.ALL:
        return this.photos
      case PhotosFilters.ARCHIVED:
        return this.photos.filter(photo => photo["archived"] == true)
    }
  }

}
