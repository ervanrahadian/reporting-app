import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegAdminPageRoutingModule } from './reg-admin-routing.module';

import { RegAdminPage } from './reg-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegAdminPageRoutingModule
  ],
  declarations: [RegAdminPage]
})
export class RegAdminPageModule {}
