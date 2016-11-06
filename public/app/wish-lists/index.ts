import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { WishListRoutingModule } from './wish-list-routing.module';
import { WishListListComponent,
         WishListDetailComponent,
         WishListFormComponent } from './wish-list.components';


@NgModule({
  imports: [
    SharedModule,
    WishListRoutingModule
  ],
  declarations: [
    WishListDetailComponent,
    WishListFormComponent,
    WishListListComponent
  ]
})
export class WishListModule { }
