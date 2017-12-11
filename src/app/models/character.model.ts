export class Character {
  public name: string;
  public backstory: string;
  public portraitImagePath: string;
  constructor(name: string, backstory: string, portraitImagePath: string) {
    this.name = name;
    this.backstory = backstory;
    this.portraitImagePath = portraitImagePath;
  }
}
