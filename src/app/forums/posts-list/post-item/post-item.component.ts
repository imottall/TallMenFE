import {Component, Input} from '@angular/core';
import {Post} from '../../../models/forums/post.model';
import {ForumService} from '../../../services/forum.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent {
  @Input() post: Post;

  constructor(private router: Router, private route: ActivatedRoute) { }

  public getReplies(){
    let forumId: string;
    this.route.params.subscribe(params => forumId = params['forumId']);
    this.router.navigateByUrl(forumId + '/' + this.post._id + '/replies');
  }
}
