import { Component, OnInit } from '@angular/core';
import { OwnersService } from './shared/services/owners.service';
import { Owner } from './shared/interfaces/owner.interface';
import { PoInfoOrientation, PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'mp-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {

  owners: Array<Owner>;
  orientation = PoInfoOrientation;
  actions: Array<PoPageAction>;

  constructor(
    private ownersService: OwnersService
  ) {
    console.log('Entrei no constructor');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.actions = this.getActions();
    this.getOwners();
  }

  getOwners(): void {
    this.ownersService.get().subscribe(
      {
        next: response => this.owners = response, // sucesso
        error: error => console.error(error), // erro
        complete: () => console.log('Finalizei'), //quanto finalizou
      }
    );
  }

  getActions(): Array<PoPageAction> {
    return [
      { label: 'Incluir', action: () => this.entrei() }
      // { label: 'Incluir', action: this.entrei.bind(this) }
    ];
  }

  entrei(): void {
    alert('Entrei no incluir');
  }
}
