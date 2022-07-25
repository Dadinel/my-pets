import { Component, OnInit, ViewChild } from '@angular/core';
import { OwnersService } from './shared/services/owners.service';
import { Owner } from './shared/interfaces/owner.interface';
import { PoInfoOrientation, PoModalAction, PoModalComponent, PoPageAction } from '@po-ui/ng-components';
import { OwnersFormComponent } from './owners-form/owners-form.component';

@Component({
  selector: 'mp-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {
  @ViewChild(PoModalComponent, { static: true}) ownerFormModal: PoModalComponent;
  owners: Array<Owner>;
  orientation = PoInfoOrientation;
  actions: Array<PoPageAction>;
  modalActions: Array<PoModalAction>;
  onwerFormToSave: Owner;
  @ViewChild(OwnersFormComponent, { static: true}) mpOwnersForm: OwnersFormComponent;
  updatingOwner: boolean;
  modalTitle: string;

  constructor(
    private ownersService: OwnersService
  ) {
    console.log('Entrei no constructor');
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getOwners();
    this.actions = this.getActions();
    this.modalActions = this.getModalActions();
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
      { label: 'Incluir', action: () => this.openModalToInsert() }
      // { label: 'Incluir', action: this.entrei.bind(this) }
    ];
  }

  entrei(): void {
    alert('Entrei no incluir');
  }

  receiverForm(owner: Owner): void {
    console.log('Entrei no pai', owner);
    this.onwerFormToSave = owner;
  }

  deleteOwner(id: string): void {
    this.ownersService.delete(id).subscribe(
      {
        next: response => this.getOwners()
      }
    );
  }

  openModalToInsert(): void {
    this.updatingOwner = false;
    this.modalTitle = 'Incluir';
    this.openModal();
  }

  openModalToUpdate(owner: Owner): void {
    this.updatingOwner = true;
    this.mpOwnersForm.buildFormToUpdate(owner);
    this.modalTitle = 'Alterar';
    this.openModal();
  }

  openModal(): void {
    this.ownerFormModal.open();
  }

  closeModal(): void {
    this.ownerFormModal.close();
    this.mpOwnersForm.clearForm();
  }

  getModalActions(): Array<PoModalAction> {
    return [
      {label: 'Salvar', action: () => this.saveOwner() },
      {label: 'Cancelar', action: () => this.closeModal() }
    ];
  }

  saveOwner(): void {
    if (this.updatingOwner) {
      this.putOwner();
    } else {
      this.postOwner();
    }
  }

  postOwner(): void {
    this.ownersService.post(this.onwerFormToSave).subscribe(
      {
        next: () => {
          this.getOwners();
          this.closeModal();
        }
      }
    );
  }

  putOwner(): void {    
    this.ownersService.put(this.onwerFormToSave).subscribe(
      {
        next: () => {
          this.closeModal();
          this.getOwners();
        }
      }
    );
  }
}
