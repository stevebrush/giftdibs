import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent,
         DashboardWishListsComponent,
         DashboardWishListsFormComponent } from './dashboard.components';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardWishListsComponent },
      { path: 'wish-lists', component: DashboardWishListsComponent },
      { path: 'wish-lists/create', component: DashboardWishListsFormComponent },
      { path: 'wish-lists/:id', component: DashboardWishListsFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
