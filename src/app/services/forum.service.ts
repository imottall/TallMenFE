import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Forum } from '../models/forums/forum.model';
import { Post } from '../models/forums/post.model';
import { Reply } from '../models/forums/reply.model';

@Injectable()
export class ForumService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  public getForums(): Promise<Forum[]> {
    console.log('items ophalen van server');
    return this.http.get(environment.serverUrl + '/forums', { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        return response.json() as Forum[];
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
