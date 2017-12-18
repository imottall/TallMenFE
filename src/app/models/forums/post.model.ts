import { Reply } from './reply.model';
import {Account} from "../account.model";

export class Post {
  public title: string;
  public message: string;
  public account: Account;
  public replies: Reply[];
  public _id: string;
}
