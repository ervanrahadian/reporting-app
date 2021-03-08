import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegAdminPage } from './reg-admin.page';

const routes: Routes = [
  {
    path: '',
    component: RegAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegAdminPageRoutingModule {}
