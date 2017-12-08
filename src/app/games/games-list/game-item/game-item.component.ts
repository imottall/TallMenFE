import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../../../models/game.model';
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