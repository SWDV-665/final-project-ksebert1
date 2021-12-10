import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { action, computed} from 'mobx';
import { observable } from 'mobx-angular';
import { MobxAngularModule } from 'mobx-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
  @observable pets = [];
  // pets = [];

  constructor() { }

  ngOnInit() {
    this.initPet();
    setTimeout(() => {
      this.createPet();
      console.log('added pet')
    },1500);
  }
  
  @action
   initPet(){
    this.pets = [];
    };

    @action
    archivePet(pet){
     pet.archived = true;
     console.log(pet +" was archived")
     };

  @action
   createPet(){
    this.pets.push({
      name: 'Rex',
      species: 'Dog',
      birthday: '2015-06-01',
      breed: 'Golden Retriever',
      color: 'Tan',
      description: '',
      adopted: '2017-06-13',
      gender: 'male',
      altered: 'yes',
      microchipped: 'yes',
      archived: false
    });
  }

  @computed
  get archivedPetCount(){
    return this.pets.filter((pet) => !!pet.archived).length;
  }
}
