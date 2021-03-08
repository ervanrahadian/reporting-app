import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatPage } from './stat.page';

const routes: Routes = [
  {
    path: '',
    component: StatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatPageRoutingModule {}
