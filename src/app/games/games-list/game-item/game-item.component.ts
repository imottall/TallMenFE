import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../../../models/game.model';
import {Subscription} from "rxjs/Subscription";
import {GameService} from "../../../services/game.service";
import {Character} from "../../../models/character.model";
@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.css']
})
export class GameItemComponent implements OnInit {
  @Input() game: Game;

  constructor() { }

  ngOnInit() {
  }

  public testFunction() {
    console.log("meow");
  }
}
