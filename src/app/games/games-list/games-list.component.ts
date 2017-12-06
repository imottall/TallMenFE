import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {
  games: Game[];

  constructor() { }

  ngOnInit() {
    // TODO: add api implementation
    //DELETE FROM HERE! This is purely used for testing purposes
    this.games = [new Game('sonic', 'race', 'https://images4.alphacoders.com/280/280804.jpg', 'https://upload.wikimedia.org/wikipedia/en/b/ba/Sonic_the_Hedgehog_1_Genesis_box_art.jpg'),
      new Game('megaman', 'platformer', 'https://images4.alphacoders.com/280/280804.jpg', 'https://vignette.wikia.nocookie.net/megaman/images/7/74/MegaManArchieC012.jpg/revision/latest?cb=20120405063026')];
    //TILL HERE!


  }

}
