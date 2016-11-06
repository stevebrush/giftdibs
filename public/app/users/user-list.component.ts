import { Component, OnInit } from '@angular/core';
import { IUser } from '../shared/interfaces';
import { UserService } from '../shared/services/';

@Component({
  template: require('./user-list.component.html')
})
export class UserListComponent implements OnInit {

  public users: IUser[];

  constructor(
    private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getAll()
      .then((data: any) => this.users = data);
  }
}
