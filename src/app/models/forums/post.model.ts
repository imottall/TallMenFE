import { Reply } from './reply.model';

export class Post {
  public title: string;
  public authorId: string;
  public message: string;
  public forumId: string;
  public _id: string;
  constructor(title: string) {
    this.title = title;
  }
}
