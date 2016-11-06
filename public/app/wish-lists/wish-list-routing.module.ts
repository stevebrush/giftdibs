import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth-guard.service';

import { WishListListComponent,
         WishListDetailComponent,
         WishListFormComponent } from './wish-list.components';


const routes: Routes = [
  { path: '', component: WishListListComponent },
  { path: 'create', component: WishListFormComponent, canActivate: [AuthGuard] },
  { path: ':id', component: WishListDetailComponent },
  { path: ':id/edit', component: WishListFormComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WishListRoutingModule { }
