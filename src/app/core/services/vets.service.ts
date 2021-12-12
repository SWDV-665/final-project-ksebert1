import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { observable, action, computed } from 'mobx-angular';
import {VetsFilters} from '../constants/vets-filters.enum'
import {Vet, IVet} from '../models/vet.model';

@Injectable({
  providedIn: 'root'
})
export class VetsService extends StorageService{
tableName = 'vets';

vetFields = ['name', 'phone', 'email', 'address1', 'address2', 'city', 'state', 'sex', 'zip','vfn','vmn', 'vln', 'description', 'archived'];
 
@observable vets: Array<Vet>;
@observable filter: VetsFilters;


@action
initVets() {
  this.vets = [];
  this.filter = VetsFilters.ACTIVE;
  this.getAllVets();
}

async getAllVets() {
  const vets = await super.getAll(this.tableName);
  this.setVet(vets.map(Vet => new vets(Vet)));
}

@action
setVets(vets: Array<Vet>) {
  this.vets = vets;
  console.log('vets set', this.vets);
}


@action
setFilter(filter: VetsFilters) {
  this.filter = filter;
}

@action
  async archiveVet(vet: Vet) {
    vet.setArchived(true);
    await super.update(
      this.tableName,
      vet.id,
      this.vetFields,
  [vet.name,
    vet.phone,
     vet.email,
     vet.address1,
     vet.address2,
     vet.city,
     vet.state,
     vet.zip,
     vet.vfn,
     vet.vmn,
     vet.vln,
     vet.description,
     vet.archived
  ]

    );
  }

  @action
  async createVet(vet: Partial<IVet>) {
    const response = await super.create(
      this.tableName,
      this.vetFields,
      [vet.name,
        vet.phone,
         vet.email,
         vet.address1,
         vet.address2,
         vet.city,
         vet.state,
         vet.zip,
         vet.vfn,
         vet.vmn,
         vet.vln,
         vet.description,
         vet.archived ? vet.archived : false
      ]
    );
    const savedVet = await super.getById(
      this.tableName,
      response.insertId
    );
    this.setVets([...this.vets, new Vet(savedVet)]);
  }

  @action
  async updateVet(vet: Vet) {
    await super.update(
      this.tableName,
     vet.id,
this.vetFields,
[vet.name,
  vet.phone,
   vet.email,
   vet.address1,
   vet.address2,
   vet.city,
   vet.state,
   vet.zip,
   vet.vfn,
   vet.vmn,
   vet.vln,
   vet.description,
   vet.archived
]
    );
    this.setVet(new Vet(vet));
  }

  @action
  setVet(Vet: Vet) {
    for (let i = 0, len = this.vets.length; i < len; ++i) {
      if (Vet.id === this.vets[i].id) {
        this.vets[i] = Vet;
        break;
      }
    }
  }

  @computed
  get archivedNotesCount() {
    return this.vets.filter((note) => !!note.archived).length;
  }

  @computed
  get filteredVets() {
    switch (this.filter) {
      case VetsFilters.ACTIVE:
        return this.vets.filter(note => !note.archived);
      case VetsFilters.ARCHIVED:
        return this.vets.filter(note => !!note.archived);
    }
  }




}
