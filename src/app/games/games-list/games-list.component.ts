import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game.model';
import { GameService } from "../../services/game.service";

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  games: Game[];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getGames()
      .then(games => this.games = games)
      .catch(error => console.log(error));
  }

}
