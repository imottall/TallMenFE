import {Account} from "../account.model";

export class Reply {
  public message: string = '';
  public account: Account = new Account;
  public replyToAuthor: Account = new Account;
  public _id: string = '';
}
