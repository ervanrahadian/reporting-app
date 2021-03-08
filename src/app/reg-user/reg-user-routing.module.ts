import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegUserPage } from './reg-user.page';

const routes: Routes = [
  {
    path: '',
    component: RegUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegUserPageRoutingModule {}
