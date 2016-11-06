import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { IUser } from '../shared/interfaces';
import { UserService } from '../shared/services/';

@Component({
  template: require('./user-profile.component.html')
})
export class UserProfileComponent implements OnInit {

  public user: IUser;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private userService: UserService) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id: string = params['id'];
      this.userService.getById(id)
        .then(data => {
          this.user = data;
        });
    });
  }
}
