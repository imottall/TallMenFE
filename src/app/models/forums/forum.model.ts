import { Post } from './post.model';

export class Forum {
  public topic: string = '';
  public posts: Post[] = [];
  public _id: string = '';
  constructor(topic: string){
    this.topic = topic;
  }
}
