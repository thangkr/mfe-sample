import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FFListComponent } from './ff-list/ff-list.component';

const routes: Routes = [{ component: FFListComponent, path: '' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FFRoutingModule { }
