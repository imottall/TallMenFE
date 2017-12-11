import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/forums/post.model";
import {Subscription} from "rxjs/Subscription";
import {ForumService} from "../../services/forum.service";
import {isNullOrUndefined} from "util";
import {ActivatedRoute, Router} from "@angular/router";
import {Forum} from "../../models/forums/forum.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];
  forumId: string;
  postForm: FormGroup;

  constructor(private forumService: ForumService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.forumId = params['forumId']);

    this.forumService.getPosts(this.forumId)
      .then(forum => this.posts = forum[0].posts)
      .catch(error => console.log(error));

    this.postForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'message': new FormControl(''),
      'author': new FormControl('')
    });
  }

  public onSubmit() {
    this.posts.push(this.postForm.value);
    this.forumService.postPost(this.forumId, this.postForm.value);
  }

  public getBack(){
    this.router.navigateByUrl('/forums');
  }
}
