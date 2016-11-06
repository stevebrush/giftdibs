import { Component, OnInit } from '@angular/core';
import { IWishList, IUser } from '../../shared/interfaces';
import { WishListService, SessionService } from '../../shared/services';

@Component({
  template: require('./dashboard-wish-lists.component.html')
})
export class DashboardWishListsComponent implements OnInit {
  public wishLists: IWishList[];
  private user: IUser;

  constructor(
    private wishListService: WishListService,
    private sessionService: SessionService) { }

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    this.getWishLists();
  }

  private getWishLists(): void {
    this.wishListService.getAllByUserId(this.user._id)
      .then(data => this.wishLists = data);
  }
}
