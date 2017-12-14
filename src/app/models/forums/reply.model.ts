export class Reply {
  public message: string;
  public authorId: string;
  public replyToAuthorId: string;
  public postId: string;
  public _id: string;
  constructor(message: string) {
    this.message = message;
  }
}
