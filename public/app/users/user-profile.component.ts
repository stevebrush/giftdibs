import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { IUser, IWishList } from '../shared/interfaces';
import { UserService, WishListService } from '../shared/services/';

@Component({
  template: require('./user-profile.component.html')
})
export class UserProfileComponent implements OnInit {

  public user: IUser;
  public wishLists: IWishList[];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private userService: UserService,
    private wishListService: WishListService) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id: string = params['id'];
      this.userService.getById(id)
        .then(data => this.user = data);
      this.wishListService.getAllByUserId(id)
        .then(data => this.wishLists = data.value);
    });
  }
}
