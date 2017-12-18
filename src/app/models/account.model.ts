import {Reply} from "./forums/reply.model";
import {Post} from "./forums/post.model";

export class Account {
  public name: string = '';
  public password: string = '';
  public replies: Reply[] = [];
  public posts: Post[] = [];
  public _id: string = '';
}
