export class Reply {
  public message: string;
  public author: string;
  public replies: Reply[];
  public _id: string;
  constructor(message: string) {
    this.message = message;
  }
}
