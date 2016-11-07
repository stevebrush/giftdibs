import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { CrudableService } from './crudable.service';
import 'rxjs/add/operator/toPromise';


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

  getAllByUserId(id: string, doPopulate?: boolean): Promise<any> {
    let options = new RequestOptions({
      search: new URLSearchParams(this.parseDoPopulate(doPopulate))
    });
    return this.http.get('/api/wish-lists/user/' + id, options).toPromise()
      .then(data => data.json());
  }
}
