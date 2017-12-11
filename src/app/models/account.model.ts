export class Account {
  public name: string;
  public password: string;
  public _id: string;
  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }
}
