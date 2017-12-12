import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import {Account} from "../models/account.model";

@Injectable()
export class AccountService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  public account: Account;
  public loggedIn: boolean = false;

  constructor(private http: Http) { }

  public validateLogin(account: Account): Promise<Account> {
    return this.http.post(environment.serverUrl + '/login', account, { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json() as Account;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }
}
