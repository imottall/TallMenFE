import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import {Account} from "../models/account.model";
import {Subject} from "rxjs/Subject";
import {Reply} from "../models/forums/reply.model";

@Injectable()
export class AccountService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  public account: Account;
  public loggedIn: boolean = false;
  accountChanged = new Subject<Account>();

  constructor(private http: Http) { }

  public validateLogin(account: Account): Promise<Account> {
    return this.http.post(environment.serverUrl + '/login', account, { headers: this.headers })
      .toPromise()
      .then(response => {
        this.accountChanged.next(this.account);
        return response.json() as Account;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public getReplies(authorId: string): Promise<Reply[]> {
    console.log(this.account);
    return this.http.get(environment.serverUrl + '/forums/posts/' + authorId + '/getReplies', { headers: this.headers })
      .toPromise()
      .then(response => {
        console.log(response);
        return response.json() as Reply[];
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
