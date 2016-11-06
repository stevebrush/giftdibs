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
        console.log("Set user to:", this.user);
        return data;
      })
      .catch(this.handleError);
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
