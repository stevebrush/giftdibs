import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent, UserProfileComponent } from './user.components';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    UserListComponent,
    UserProfileComponent
  ]
})
export class UserModule { }
