import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GameService} from "../../services/game.service";
import {Character} from "../../models/character.model";

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent implements OnInit {
  @Input() gameName: string;
  @Output() subjectUpdated = new EventEmitter();
  characters: Character[];
  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getCharacters(this.gameName)
      .then(characters => this.characters = characters)
      .catch(error => console.log(error));
  }

}
