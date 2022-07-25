import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Owner } from '../shared/interfaces/owner.interface';

@Component({
  selector: 'mp-owners-form',
  templateUrl: './owners-form.component.html',
  styleUrls: ['./owners-form.component.css']
})
export class OwnersFormComponent implements OnInit {
  @Output() sendOwnerFormToSave = new EventEmitter();
  ownerForm: FormGroup;
  idReadOnly: string; //Isso não deveria ser um booleano?

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.onChangeForm();
  }

  buildForm(): void {
    this.ownerForm = this.formBuilder.group(this.emptyFormOwner());
  }

  clearForm(): void {
    this.idReadOnly = "false";
    this.ownerForm.setValue(this.emptyFormOwner());
  }

  private emptyFormOwner(): any {
    return {
      id: '',
      name: '',
      cpf: '',
      rg: '',
      email: '',
      tel1: '',
      tel2: ''
    };
  }

  buildFormToUpdate(owner: Owner): void {
    this.idReadOnly = "true";
    this.ownerForm.setValue(
      {
        id: owner.id,
        name: owner.name,
        cpf: owner.cpf,
        rg: owner.rg,
        email: owner.email,
        tel1: owner.tel1,
        tel2: owner.tel2
      }
    );
  }

  onChangeForm(): void {
    this.ownerForm.valueChanges.subscribe(
      {
        next: (form: any) => {
          console.log('Entrei', form);
          this.sendOwnerFormToSave.emit(form);
        }
      }
    )
  }
}
