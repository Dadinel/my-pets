import { Component, OnInit, EventEmitter, Output, Input, Injectable, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PoLookupComponent } from '@po-ui/ng-components';
import { Pet } from '../shared/interfaces/pet.interface';
import { OwnersLookupService } from '../shared/services/owners.lookup.service';

@Component({
  selector: 'mp-pets-form',
  templateUrl: './pets-form.component.html',
})
export class PetsFormComponent implements OnInit {
  @Output() sendPetFormToSave = new EventEmitter();
  petForm: FormGroup;
  idReadOnly: string; //Isso não deveria ser um booleano?
  infineScroll: boolean;
  @ViewChild(PoLookupComponent, {static: true}) poLookupComponent: PoLookupComponent;

  constructor(
    private formBuilder: FormBuilder,
    public ownersLookup: OwnersLookupService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.onChangeForm();
    this.infineScroll = true;
  }

  buildForm(): void {
    this.petForm = this.formBuilder.group(this.emptyFormOwner());
  }

  clearForm(): void {
    this.idReadOnly = "false";
    this.enableLookup();
    this.petForm.setValue(this.emptyFormOwner());
  }

  private emptyFormOwner(): any {
    return {
      id: '',
      name: '',
      color: '',
      breed: '',
      type: '',
      ownerId: ''
    };
  }

  buildFormToUpdate(pet: Pet): void {
    this.idReadOnly = "true";
    this.petForm.setValue(
      {
        id: pet.id,
        name: pet.name,
        color: pet.color,
        breed: pet.breed,
        type: pet.type,
        ownerId: pet.ownerId.toString(),
      }
    );
    this.enableLookup();
  }

  onChangeForm(): void {
    this.enableLookup();
    this.petForm.valueChanges.subscribe(
      {
        next: (form: any) => {
          this.sendPetFormToSave.emit(form);
        }
      }
    )
  }

  enableLookup() {
    //Não entendi o motivo, mas o lookup desativa quando o valor é informado manualmente...
    this.poLookupComponent.disabled = false;
  }

}