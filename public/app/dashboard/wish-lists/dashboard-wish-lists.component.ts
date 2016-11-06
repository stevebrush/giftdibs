import { Component, OnInit } from '@angular/core';
import { IWishList } from '../../shared/interfaces';
import { WishListService } from '../../shared/services';

@Component({
  template: require('./dashboard-wish-lists.component.html')
})
export class DashboardWishListsComponent implements OnInit {
  public wishLists: IWishList[];

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
