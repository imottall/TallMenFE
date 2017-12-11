import { Reply } from './reply.model';

export class Post {
  public title: string;
  public author: string;
  public message: string;
  public replies: Reply[];
  public _id: string;
  constructor(title: string) {
    this.title = title;
  }
}
