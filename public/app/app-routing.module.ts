import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/wish-lists',
    pathMatch: 'full'
  },
  {
    path: 'wish-lists',
    loadChildren: './wish-lists/index.ts#WishListModule'
  },
  {
    path: 'users',
    loadChildren: './users/index.ts#UserModule'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/index.ts#DashboardModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanDeactivateGuard, AuthGuard]
})
export class AppRoutingModule { }
