import { Post } from './post.model';

export class Forum {
  public topic: string;
  public posts: Post[];
  constructor(topic: string) {
    this.topic = topic;
  }
}
