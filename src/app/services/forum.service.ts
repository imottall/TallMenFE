import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { Forum } from '../models/forums/forum.model';
import {Reply} from "../models/forums/reply.model";
import {Post} from "../models/forums/post.model";

@Injectable()
export class ForumService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  public getForums(): Promise<Forum[]> {
    return this.http.get(environment.serverUrl + '/forums', { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json() as Forum[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public getPosts(forumId: string): Promise<Forum[]> {
    return this.http.get(environment.serverUrl + '/' + forumId + '/posts', { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json() as Forum[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public postPost(forumId: string, post: Post) {
    this.http.post(environment.serverUrl + '/'+ forumId + '/newPost' , post,{ headers: this.headers })
      .toPromise()
      .then(response => {
        return 'blieb';
      })
      .catch(error => {
        return this.handleError(error);
      });
  }


  public getReplies(forumId: string, postId: string): Promise<Forum[]> {
    return this.http.get(environment.serverUrl + '/' + forumId + '/' + postId + '/replies', { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json() as Forum[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public postReply(forumId: string, postId: string, reply: Reply) {
    this.http.post(environment.serverUrl + '/'+ forumId + '/' + postId + '/newReply' , reply,{ headers: this.headers })
      .toPromise()
      .then(response => {
        return 'blieb';
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public postReplyToReply(forumId: string, postId: string, replyId: string, reply: Reply) {
    this.http.post(environment.serverUrl + '/'+ forumId + '/' + postId + '/' + replyId + '/newReply' , reply,{ headers: this.headers })
      .toPromise()
      .then(response => {
        return 'blieb';
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
