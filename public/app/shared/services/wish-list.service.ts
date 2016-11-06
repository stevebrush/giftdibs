import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CrudableService } from './crudable.service';

@Injectable()
export class WishListService extends CrudableService {
  constructor(http: Http) {
    super(http, 'wish-lists', {
      delete: {
        permission: 'DELETE_WISH_LIST'
      },
      post: {
        permission: 'CREATE_WISH_LIST'
      },
      put: {
        permission: 'UPDATE_WISH_LIST'
      }
    });
  }
}
