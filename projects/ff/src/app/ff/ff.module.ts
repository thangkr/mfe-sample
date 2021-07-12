import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FFRoutingModule } from './ff-routing.module';
import { FFListComponent } from './ff-list/ff-list.component';

@NgModule({
  declarations: [FFListComponent],
  imports: [
    CommonModule,
    FFRoutingModule
  ]
})
export class FFModule { }
