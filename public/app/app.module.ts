import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WishListModule } from './wish-lists';
import { LoginModule } from './login';
import { LogoutModule } from './logout';
import { UserModule } from './users';
import { WishListService, SessionService, UserService } from './shared/services';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    LoginModule,
    LogoutModule,
    WishListModule
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    Title,
    WishListService,
    SessionService,
    UserService
  ]
})
export class AppModule { }
