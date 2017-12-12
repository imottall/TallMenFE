import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/forums/post.model";
import {ForumService} from "../../services/forum.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Account} from "../../models/account.model";
import {AccountService} from "../../services/account.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];
  forumId: string;
  postForm: FormGroup;
  account: Account;
  creatingPost: boolean;

  constructor(private forumService: ForumService, private accountService: AccountService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.creatingPost = false;

    this.route.params.subscribe(params => this.forumId = params['forumId']);

    this.account = this.accountService.account;

    this.forumService.getPosts(this.forumId)
      .then(forum => this.posts = forum[0].posts)
      .catch(error => console.log(error));

    this.postForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'message': new FormControl(''),
      'author': new FormControl('')
    });
  }

  public setCreatingPost(){
    this.creatingPost = !this.creatingPost;
    this.postForm.reset();
  }

  public onSubmit() {
    if(this.accountService.loggedIn) {
      this.postForm.value.author = this.account.name;
    }
    this.posts.push(this.postForm.value);
    console.log(this.postForm.value);
    this.forumService.postPost(this.forumId, this.postForm.value);
    this.setCreatingPost();
  }

  public getBack(){
    this.router.navigateByUrl('/forums');
  }
}
