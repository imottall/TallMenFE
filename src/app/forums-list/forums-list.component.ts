import { Component, OnInit } from '@angular/core';
import { ForumService } from '../services/forum.service';
import { Forum } from '../models/forums/forum.model';

@Component({
  selector: 'app-forums-list',
  templateUrl: './forums-list.component.html',
  styleUrls: ['./forums-list.component.css']
})
export class ForumsListComponent implements OnInit {
  forums: Forum[] = [];
  constructor(private forumService: ForumService) { }

  ngOnInit() {
    this.forumService.getForums()
      .then(forums => {this.forums = forums; console.log(forums)})
      .catch(error => console.log(error));
  }

}
