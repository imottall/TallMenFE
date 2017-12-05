import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TestService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private items: string[] = [];

  constructor(private http: Http) { }

  public getUsers(): Promise<string[]> {
    console.log('items ophalen van server');
    return this.http.get(environment.serverUrl + '/users', { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as string[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public getNeoUsers(): Promise<string[]> {
    console.log('items ophalen van server');
    return this.http.get(environment.serverUrl + '/neousers', { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as String[];
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
