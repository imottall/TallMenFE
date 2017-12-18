import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import {Account} from "../models/account.model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AccountService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  accountChanged = new Subject<string>();
  private accountId: string;

  constructor(private http: Http) { }

  public createAccount(account: Account) {
    return this.http.post(environment.serverUrl + '/accounts/register', account, { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json() as Account;
      })
      .catch(error => {
        return this.handleError(error);
      })
  }

  public validateLogin(account: Account): Promise<Account> {
    return this.http.post(environment.serverUrl + '/accounts/login', account, { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json() as Account;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public getAccount(accountId: string): Promise<Account> {
    return this.http.get(environment.serverUrl + '/accounts/' + accountId + '/get', { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json() as Account;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public updateAccount(accountId: string, account: Account){
    return this.http.post(environment.serverUrl + '/accounts/' + accountId + '/update', account, { headers: this.headers })
      .toPromise()
      .then(response => {
        return this.accountChanged.next(this.accountId);
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public deleteAccount(accountId: string){
    return this.http.delete(environment.serverUrl + '/accounts/' + accountId + '/delete', { headers: this.headers })
      .toPromise()
      .then(response => {
        return this.removeAccountId();
      })
      .catch(error => {
        return this.handleError(error);
      })
  }

  public getAccountId(){
    return JSON.parse(localStorage.getItem("accountId")) as string;
  }

  public setAccountId(accountId: string){
    localStorage.setItem("accountId", JSON.stringify(accountId));
    this.accountChanged.next(this.accountId);
  }

  public removeAccountId(){
    localStorage.removeItem("accountId");
    this.accountChanged.next(this.accountId);
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }
}
