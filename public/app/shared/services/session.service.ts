import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IUser } from '../interfaces/';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SessionService {

  private isLoggedIn: boolean = false;
  private user: IUser;

  constructor(private http: Http) { }

  login(emailAddress: string, password: string): Promise<any> {
    return this.http.post('/session/login/', {
      emailAddress: emailAddress,
      password: password
    }).toPromise()
      .then(res => {
        let data = res.json();
        this.isLoggedIn = true;
        this.user = <IUser>data.user;
        return data;
      })
      .catch(this.handleError);
  }

  logout(): Promise<any> {
    return this.http.delete('/session/logout').toPromise()
      .then(res => {
        this.isLoggedIn = false;
        this.user = null;
        return res.json();
      });
  }

  getUser(): IUser {
    return this.user;
  }

  getStatus(): boolean {
    return this.isLoggedIn;
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.json().message);
  }
}
