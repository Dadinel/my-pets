import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [

  ],
  imports: [
    PoModule,
    CommonModule
  ],
  exports: [
    PoModule,
    CommonModule
  ]
})
export class SharedModule { }
