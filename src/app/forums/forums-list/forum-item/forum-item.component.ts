import {Component, Input} from '@angular/core';
import {Forum} from '../../../models/forums/forum.model';
import {ForumService} from "../../../services/forum.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-forum-item',
  templateUrl: './forum-item.component.html',
  styleUrls: ['./forum-item.component.css']
})
export class ForumItemComponent {
  @Input() forum: Forum;

  constructor(private forumService: ForumService, private router: Router, private route: ActivatedRoute) { }

  public getPosts(){
    this.router.navigate(['./'+ this.forum._id + '/posts'], {relativeTo: this.route});
  }
}
