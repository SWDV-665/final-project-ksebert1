import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PetsFilters } from 'src/app/core/constants/pets-filters.enum';

@Component({
  selector: 'app-pets-filters-popover',
  templateUrl: './pets-filters-popover.component.html',
  styleUrls: ['./pets-filters-popover.component.scss'],
})
export class PetsFiltersPopoverComponent implements OnInit {
  selectedFilter: PetsFilters = PetsFilters.ALL;
  filters = PetsFilters;

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  setFilter(filter: PetsFilters){
    this.popoverController.dismiss(filter);
  }

}
