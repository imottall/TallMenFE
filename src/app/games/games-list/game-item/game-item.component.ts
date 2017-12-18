import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../../../models/game.model';
import {Subscription} from "rxjs/Subscription";
import {GameService} from "../../../services/game.service";
import {Character} from "../../../models/character.model";
import {ForumService} from "../../../services/forum.service";
import {Router} from "@angular/router";
import {isNullOrUndefined} from "util";
@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.css']
})
export class GameItemComponent implements OnInit {
  @Input() game: Game;
  @Input() character: Character;
  characterSelected: boolean;

  constructor(private forumService: ForumService, private router: Router) { }

  public ngOnInit() {
    this.characterSelected = false;
  }

  public goToGameForum() {
    this.forumService.getGamePosts(this.game.name)
      .then(forum => {if(!isNullOrUndefined(forum)){this.router.navigateByUrl('/' + forum._id + '/posts')}})
      .catch(error => console.log(error))
  };

  public handleSubjectUpdated(object: object){
    if(isNullOrUndefined(object)){
      this.characterSelected = false;
    } else {
      this.characterSelected = true;
      this.character = object as Character;
    }
  }
}
