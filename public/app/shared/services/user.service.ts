import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CrudableService } from './crudable.service';

@Injectable()
export class UserService extends CrudableService {
  constructor(http: Http) {
    super(http, 'users', {
      delete: {
        permission: 'DELETE_USER'
      },
      post: {
        permission: 'CREATE_USER'
      },
      put: {
        permission: 'UPDATE_USER'
      }
    });
  }
}
