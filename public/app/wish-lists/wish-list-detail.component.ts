import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { IWishList } from '../shared/interfaces';
import { WishListService } from '../shared/services';

@Component({
  template: require('./wish-list-detail.component.html')
})
export class WishListDetailComponent implements OnInit {
  wishList: IWishList;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private wishListService: WishListService) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id: string = params['id'];
      this.wishListService.getById(id)
        .then((data: any) => {
          this.wishList = data;
        });
    });
  }
}
