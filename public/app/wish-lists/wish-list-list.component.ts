import { Component, OnInit } from '@angular/core';
import { IWishList } from '../shared/interfaces';
import { WishListService } from '../shared/services/';


@Component({
  template: require('./wish-list-list.component.html')
})
export class WishListListComponent implements OnInit {

  wishLists: IWishList[];

  constructor(
    private wishListService: WishListService) { }

  ngOnInit(): void {
    this.getWishLists();
  }

  private getWishLists(): void {
    this.wishListService.getAll()
      .then(data => this.wishLists = data);
  }
}
