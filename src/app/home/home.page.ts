import { NotExpr } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { action, computed} from 'mobx';
import { observable } from 'mobx-angular';
import { MobxAngularModule } from 'mobx-angular';
import { Pet } from '../core/models/pet.model';
import { PetsService } from '../core/services/pets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
  constructor(public store: PetsService ) { }

  ngOnInit() {
  }
  
  archivePet(pet: Pet){
    this.store.archivePet(pet);
    };

    createPet() {
    this.store.createPet({
      name: 'My new Pet',
      archived: false
    });

    }

}
