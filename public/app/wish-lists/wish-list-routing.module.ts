import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WishListComponent } from './wish-list.component';
import { WishListListComponent } from './wish-list-list.component';
import { WishListDetailComponent } from './wish-list-detail.component';


const routes: Routes = [
  { path: '',
    component: WishListComponent,
    children: [
      { path: '', component: WishListListComponent },
      { path: ':id', component: WishListDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WishListRoutingModule { }
