import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PetsComponent } from './pets.component';
import { PetsRoutingModule } from './pets-routing.module';
import { PoTemplatesModule } from '@po-ui/ng-templates';

@NgModule({
  declarations: [
    PetsComponent
  ],
  imports: [
    PetsRoutingModule,
    SharedModule,
    PoTemplatesModule
  ]
})
export class PetsModule { }
