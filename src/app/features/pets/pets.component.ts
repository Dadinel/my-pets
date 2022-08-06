import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PoModalAction, PoModalComponent, PoNotificationService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Pet } from './shared/interfaces/pet.interface';
import { PetsService } from './shared/services/pets.service';
import { OwnersService } from '../owners/shared/services/owners.service';
import { Owner } from '../owners/shared/interfaces/owner.interface';
import { PetsFormComponent } from './pets-form/pets.form.component';

@Component({
  selector: 'mp-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  pageActions: Array<PoPageAction>;
  pets: Array<Pet>;
  tableActions: Array<PoTableAction>;
  columns: Array<PoTableColumn>;
  actionPet?: Pet;

  @ViewChild(PetsFormComponent, {static: true}) petSaveForm: PetsFormComponent;
  deleteFormModal: PoModalComponent;
  deletePetConfirmation: PoModalAction;
  deletePetCancel: PoModalAction;

  petFormModal: PoModalComponent;
  titleModalPet: string;
  cancelPetModal: PoModalAction;
  confirmPetModal: PoModalAction;

  @ViewChildren(PoModalComponent) petModals: QueryList<PoModalComponent>;

  constructor(
    private petsService: PetsService,
    private ownersService: OwnersService,
    private poNotificationService: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.pageActions = this.getPageActions();
    this.tableActions = this.getTableActions();
    this.columns = this.getColumns();
    this.deleteModalActions();
    this.petModalActions();
    this.getPets();
  }

  ngAfterViewInit(){
    this.deleteFormModal = this.petModals.first;
    this.petFormModal = this.petModals.last;
  }

  getPageActions(): Array<PoPageAction> {
    return [
      {label: 'Incluir', action: () => this.showPetModalInsert()}
    ];
  }

  showPetModalInsert(): void {
    this.titleModalPet = 'Incluir';
    this.confirmPetModal.action = () => this.savePet(this.insertPet.bind(this));
    this.petFormModal.open();  
  }

  showPetModalUpdate(pet: Pet): void {
    this.petSaveForm.buildFormToUpdate(pet);
    this.titleModalPet = 'Alterar';
    this.confirmPetModal.action = () => this.savePet(this.updatePet.bind(this));
    this.petFormModal.open();
  }

  getTableActions(): Array<PoTableAction> {
    return [
      {label: 'Alterar', action: this.showPetModalUpdate.bind(this)},
      {label: 'Excluir', action: this.showDeleteModal.bind(this)}
    ];
  }

  deleteModalActions(): void {
    this.deletePetConfirmation = {label: 'Sim', action: this.deletePet.bind(this)};
    this.deletePetCancel = {label: 'Não', action: () => this.deleteFormModal.close()}
  }

  petModalActions(): void {
    this.cancelPetModal = {label: 'Cancelar', action: () => this.closeFormModalClearPet()}
    this.confirmPetModal = {label: 'Confirmar', action: () => {}}
  }

  getColumns(): Array<PoTableColumn> {
    return [
      {property: 'id', label: 'Identificador'},
      {property: 'name', label: 'Nome'},
      {property: 'breed', label: 'Raça'},
      {property: 'color', label: 'Cor'},
      {property: 'type', label: 'Tipo'},
      {property: 'owner.name', label: 'Nome do dono'},  
    ];
  }

  getPets(): void {
    this.petsService.get().subscribe(
      {
        next: (response: Pet[]) => {
          this.pets = response;
          this.updateOwnerInList();
        }
      }
    );
  }

  updateOwnerInList(): void {
    for(const pet of this.pets) {
      this.ownersService.getOne(pet.ownerId.toString()).subscribe(
        {
          next: (response: Owner) => pet.owner = response
        }
      )
    }
  }

  updatePet(pet: Pet): void {
    this.petsService.put(pet).subscribe(
      {
        next: () => this.updatePetCloseModal()
      }
    )
  }

  updatePetCloseModal(): void {
    this.closeFormModalClearPet();
    this.getPets();
  }

  closeFormModalClearPet(): void {
    this.actionPet = undefined;
    this.petFormModal.close();
    this.petSaveForm.clearForm();
  }

  insertPet(pet: Pet): void {
    this.petsService.post(pet).subscribe(
      {
        next: () => this.updatePetCloseModal()
      }
    )
  }

  showDeleteModal(pet: Pet): void {
    this.actionPet = pet;
    this.deleteFormModal.open();
  }

  deletePet(): void {
    if (this.actionPet) {
      this.petsService.delete(this.actionPet.id).subscribe(
        {
          next: () => {
            this.actionPet = undefined;
            this.getPets();
            this.deleteFormModal.close();
          }
        }
      );
    }
  }

  savePet(callback: any): void {
    if (this.actionPet && this.actionPet.ownerId) {
      this.ownersService.getOne(this.actionPet.ownerId.toString()).subscribe(
        {
          next: () => {
            callback(this.actionPet)
          },
          error: () => this.poNotificationService.error('O Dono informado não existe')
        }
      )
    } else {
      this.poNotificationService.error('Não foi informado o Dono do Pet');
    }
  }

  receivePet(pet: Pet) {
    this.actionPet = pet;
  }
}
