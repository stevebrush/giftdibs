import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { LogoutComponent } from './logout.component';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LogoutComponent
  ]
})
export class LogoutModule { }
