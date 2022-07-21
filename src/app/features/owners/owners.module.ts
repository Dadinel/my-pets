import { NgModule } from '@angular/core';
import { OwnersComponent } from './owners.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OwnersRoutingModule } from './owners-routing.module';
import { PoTemplatesModule } from '@po-ui/ng-templates';

@NgModule({
  declarations: [
    OwnersComponent,
  ],
  imports: [
    SharedModule,
    OwnersRoutingModule,
    PoTemplatesModule
  ]
})
export class OwnersModule { }
