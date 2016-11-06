import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


export abstract class CrudableService {

  protected http: Http;
  protected resourceName: string;
  protected authorizations: Object = {
    delete: {
      permission: null,
      message: "You do not have permission to delete that resource."
    },
    get: {
      permission: null,
      message: "You do not have permission to read that resource."
    },
    getAll: {
      permission: null,
      message: "You do not have permission to read those resources."
    },
    post: {
      permission: null,
      message: "You do not have permission to create that resource."
    },
    put: {
      permission: null,
      message: "You do not have permission to update that resource."
    }
  };

  constructor(http: Http, resourceName: string, authorizations?: Object) {
    this.http = http;
    this.resourceName = resourceName;
    for (let k in this.authorizations) {
      if (this.authorizations.hasOwnProperty(k) && authorizations.hasOwnProperty(k)) {
        this.authorizations[k] = Object.assign({}, this.authorizations[k], authorizations[k]);
      }
    }
  }

  create(data: any): Promise<any> {
    return this.http.post('/api/' + this.resourceName + '/', data)
      .toPromise()
      .then((res: any) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  delete(id: string): Promise<any> {
    return this.http.delete('/api/' + this.resourceName + '/' + id)
      .toPromise()
      .then((res: any) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  getAll(): Promise<any[]> {
    return this.http.get('/api/' + this.resourceName + '/')
      .toPromise()
      .then((res: any) => {
        return res.json().value;
      })
      .catch(this.handleError);
  }

  getById(id: string): Promise<any> {
    return this.http.get('/api/' + this.resourceName + '/' + id)
      .toPromise()
      .then((res: any) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  update(id: string, data: any): Promise<any> {
    return this.http.put('/api/' + this.resourceName + '/' + id, data)
      .toPromise()
      .then((res: any) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.json().message);
  }
}
