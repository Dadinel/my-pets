import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { HomeRoutingModule } from './home-routings.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    PoTemplatesModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
