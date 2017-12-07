import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import {Game} from "../models/game.model";

@Injectable()
export class GameService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  public getGames(): Promise<Game[]> {
    return this.http.get(environment.serverUrl + '/games', { headers: this.headers })
      .toPromise()
      .then(response => {
        return this.convertToGames(response);
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
    response = response.json();
    let games: Game[] = [];
    for(let i = 0; i < response.length; i++){
      games.push(new Game(response[i]._fields[0], response[i]._fields[1], response[i]._fields[2], response[i]._fields[3]));
    }
    return games;
  }
}
