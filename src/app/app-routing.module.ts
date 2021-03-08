import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserPageModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminPageModule),
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./list/list.module').then((m) => m.ListPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./create/create.module').then((m) => m.CreatePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:personId',
    loadChildren: () =>
      import('./edit/edit.module').then((m) => m.EditPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'stat',
    loadChildren: () =>
      import('./stat/stat.module').then((m) => m.StatPageModule),
    canActivate: [AdminGuard],
  },
  {
    path: 'reg-user',
    loadChildren: () =>
      import('./reg-user/reg-user.module').then((m) => m.RegUserPageModule),
  },
  {
    path: 'reg-admin',
    loadChildren: () =>
      import('./reg-admin/reg-admin.module').then((m) => m.RegAdminPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
