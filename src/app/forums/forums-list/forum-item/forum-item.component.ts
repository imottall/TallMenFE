import {Component, Input} from '@angular/core';
import {Forum} from '../../../models/forums/forum.model';
import {ForumService} from "../../../services/forum.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-forum-item',
  templateUrl: './forum-item.component.html',
  styleUrls: ['./forum-item.component.css']
})
export class ForumItemComponent {
  @Input() forum: Forum;

  constructor(private forumService: ForumService, private router: Router) { }

  public getPosts(){
    this.router.navigateByUrl('/' + this.forum._id + '/posts');
  }
}
