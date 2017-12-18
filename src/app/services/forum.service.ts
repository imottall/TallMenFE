import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { Forum } from '../models/forums/forum.model';
import {Reply} from "../models/forums/reply.model";
import {Post} from "../models/forums/post.model";
import {Subject} from "rxjs/Subject";
import {isNullOrUndefined} from "util";

@Injectable()
export class ForumService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }
  repliesChanged = new Subject<Reply[]>();
  forumChanged = new Subject<Forum>();
  private replies: Reply[] = [];
  private forum: Forum;

  public createForum(forum: Forum): Promise<Forum>{
    return this.http.post(environment.serverUrl + '/forums/create', forum,{ headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json() as Forum;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public getForums(): Promise<Forum[]> {
    return this.http.get(environment.serverUrl + '/forums/get', { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json() as Forum[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public getPosts(forumId: string): Promise<Forum> {
    return this.http.get(environment.serverUrl + '/' + forumId + '/posts/get', { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json() as Forum;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public getGamePosts(gameName: string): Promise<Forum> {
    return this.http.get(environment.serverUrl + '/' + gameName + '/game/posts/get', {headers: this.headers})
      .toPromise()
      .then(response => {
        return response.json() as Forum;
      })
      .catch(error => {
        return this.handleError(error);
      })
  }

  public getReplies(postId: string): Promise<Post> {
    return this.http.get(environment.serverUrl + '/' + postId + '/replies/get', { headers: this.headers })
      .toPromise()
      .then(response => {
        return response.json() as Post;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public postPost(forumId: string, post: Post) {
    this.http.post(environment.serverUrl + '/' + forumId + '/posts/create' , post,{ headers: this.headers })
      .toPromise()
      .then(response => {
        this.forumChanged.next(this.forum);
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public postReply(postId: string, reply: Reply) {
    this.http.post(environment.serverUrl + '/' + postId + '/replies/create' , reply,{ headers: this.headers })
      .toPromise()
      .then(response => {
        this.repliesChanged.next(this.replies.slice());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public updateReply(replyId: string, reply: Reply){
    this.http.post(environment.serverUrl + '/replies/' + replyId + '/update' , reply,{ headers: this.headers })
      .toPromise()
      .then(response => {
        this.repliesChanged.next(this.replies.slice());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public deleteReply(replyId: string) {
    this.http.delete(environment.serverUrl + '/replies/' + replyId + '/delete', {headers: this.headers})
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
