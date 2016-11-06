import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SessionService } from './shared/services';
import { IUser } from './shared/interfaces';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')]
})
export class AppComponent implements OnInit {

  constructor(
    private titleService: Title,
    private sessionService: SessionService) {}

  ngOnInit(): void {
    this.setTitle('My App');
  }

  isLoggedIn(): boolean {
    return this.sessionService.getStatus();
  }

  getUserId(): string {
    let user: IUser = this.sessionService.getUser();
    return user._id;
  }

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }
}
