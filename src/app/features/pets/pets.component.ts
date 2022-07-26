import { Component, OnInit } from '@angular/core';
import { PoPageAction } from '@po-ui/ng-components';
import { Pet } from './shared/interfaces/pet.interface';
import { PetsService } from './shared/services/pets.service';

@Component({
  selector: 'mp-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  actions: Array<PoPageAction>;
  pets: Array<Pet>;

  constructor(
    private petsService: PetsService
  ) { }

  ngOnInit(): void {
    this.actions = this.getPageActions();
    this.getPets();
  }

  getPageActions(): Array<PoPageAction> {
    return [
      {label: 'Incluir', action: () => alert('Inclur pet')}
    ];
  }

  getPets(): void {
    this.petsService.get().subscribe(
      {
        next: (response: Pet[]) => this.pets = response
      }
    );
  }
}
