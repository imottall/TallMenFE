import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/forums/post.model";
import {ForumService} from "../../services/forum.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Account} from "../../models/account.model";
import {AccountService} from "../../services/account.service";

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
      .then(posts => {console.log(posts); this.posts = posts})
      .catch(error => console.log(error));

    this.postForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'message': new FormControl(''),
      'authorId': new FormControl(''),
      'forumId': new FormControl('')
    });
  }

  public setCreatingPost(){
    this.creatingPost = !this.creatingPost;
    this.postForm.reset();
  }

  public onSubmit() {
    if(this.accountService.loggedIn) {
      this.postForm.value.authorId = this.account._id;
    }
    this.postForm.value.forumId = this.forumId;
    this.posts.push(this.postForm.value);
    console.log(this.postForm.value);
    this.forumService.postPost(this.postForm.value);
    this.setCreatingPost();
  }

  public getBack(){
    this.router.navigateByUrl('/forums');
  }
}
