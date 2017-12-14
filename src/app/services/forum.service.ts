import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { Forum } from '../models/forums/forum.model';
import {Reply} from "../models/forums/reply.model";
import {Post} from "../models/forums/post.model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class ForumService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }
  repliesChanged = new Subject<Reply[]>();
  private replies: Reply[];

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

  public getPosts(forumId: string): Promise<Post[]> {
    return this.http.get(environment.serverUrl + '/' + forumId + '/posts', { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json() as Post[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public getPost(postId: string): Promise<Post[]> {
    return this.http.get(environment.serverUrl + '/forums/' + postId, { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json() as Post[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public postPost(post: Post) {
    this.http.post(environment.serverUrl + '/forums/newPost' , post,{ headers: this.headers })
      .toPromise()
      .then(response => {
        return 'blieb';
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public getReplies(postId: string): Promise<Reply[]> {
    return this.http.get(environment.serverUrl + '/forums/' + postId + '/replies', { headers: this.headers })
      .toPromise()
      .then(response => {
        this.replies = response.json() as Reply[];
        return response.json() as Reply[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public postReply(reply: Reply) {
    this.http.post(environment.serverUrl + '/forums/posts/newReply' , reply,{ headers: this.headers })
      .toPromise()
      .then(response => {
        this.repliesChanged.next(this.replies.slice());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public updateReply(replyId: string, reply: Reply){
    this.http.post(environment.serverUrl + '/forums/posts/' + replyId + '/update' , reply,{ headers: this.headers })
      .toPromise()
      .then(response => {
        this.repliesChanged.next(this.replies.slice());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public deleteReply(replyId: string) {
    this.http.delete(environment.serverUrl + '/forums/posts/' + replyId + '/delete', {headers: this.headers})
      .toPromise()
      .then(response => {
        this.repliesChanged.next(this.replies.slice());
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
