import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PetsComponent } from './pets.component';
import { PetsRoutingModule } from './pets-routing.module';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { ReactiveFormsModule } from '@angular/forms';
import { PetsFormComponent } from './pets-form/pets.form.component';
import { OwnersLookupService } from './shared/services/owners.lookup.service';

@NgModule({
  declarations: [
    PetsComponent,
    PetsFormComponent
  ],
  imports: [
    PetsRoutingModule,
    SharedModule,
    PoTemplatesModule,
    ReactiveFormsModule
  ],
  providers: [
    OwnersLookupService
  ]
})
export class PetsModule { }
