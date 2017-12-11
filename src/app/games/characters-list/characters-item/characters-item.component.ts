import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../../models/character.model";

@Component({
  selector: 'app-characters-item',
  templateUrl: './characters-item.component.html',
  styleUrls: ['./characters-item.component.css']
})
export class CharactersItemComponent implements OnInit {
  @Input() character: Character;

  constructor() { }

  ngOnInit() {
    console.log(this.character);
  }

}
