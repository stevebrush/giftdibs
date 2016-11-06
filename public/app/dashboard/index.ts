import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { DashboardComponent,
         DashboardWishListsComponent,
         DashboardWishListsFormComponent } from './dashboard.components';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    DashboardWishListsComponent,
    DashboardWishListsFormComponent
  ]
})
export class DashboardModule { }
