import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import {Game} from "../models/game.model";
import {Character} from "../models/character.model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class GameService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  public getGames(): Promise<Game[]> {
    return this.http.get(environment.serverUrl + '/games', { headers: this.headers })
      .toPromise()
      .then(response => {
        return this.convertToGames(response.json());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public getCharacters(gameName: string): Promise<Character[]> {
    return this.http.get(environment.serverUrl + '/' + gameName + '/characters', { headers: this.headers })
      .toPromise()
      .then(response => {
        return this.convertToCharacters(response.json());
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

  private convertToGames(response: any) {
    let games: Game[] = [];
    for(let i = 0; i < response.length; i++){
      games.push(response[i]._fields[0] as Game);
    }
    return games;
  }

  private convertToCharacters(response: any) {
    console.log(response);
    let characters: Character[] = [];
    for(let i = 0; i < response.length; i++){
      characters.push(response[i]._fields[0] as Character)
    }
    return characters;
  }
}
