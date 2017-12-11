export class Game {
  public name: string;
  public genre: string;
  public wallpaperImagePath: string;
  public coverImagePath: string;
  public _id: string;
  constructor(name: string, genre: string, wallpaperImagePath: string, coverImagePath: string) {

    this.name = name;
    this.genre = genre;
    this.wallpaperImagePath = wallpaperImagePath;
    this.coverImagePath = coverImagePath;
  }
}
