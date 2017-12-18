import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../models/forums/post.model";
import {ForumService} from "../../services/forum.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Account} from "../../models/account.model";
import {AccountService} from "../../services/account.service";
import {Forum} from "../../models/forums/forum.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  forum: Forum = new Forum('');
  forumId: string = '';
  postForm: FormGroup;
  creatingPost: boolean;
  subscription: Subscription;

  constructor(private forumService: ForumService, private accountService: AccountService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.creatingPost = false;
    this.route.params.subscribe(params => {this.forumId = (params['forumId']);
      this.forumService.getPosts(this.forumId)
        .then(forum => this.forum = forum)
        .catch(error => console.log(error))});

    this.subscription = this.forumService.forumChanged
      .subscribe(
        (forums: Forum) => {
          this.forumService.getPosts(this.forumId)
            .then(forum =>  this.forum = forum)
            .catch(error => console.log(error))
        }
      );

    this.postForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'message': new FormControl(''),
      'account': new FormControl('')
    });
  }

  public setCreatingPost(){
    this.creatingPost = !this.creatingPost;
    this.postForm.reset();
  }

  public onSubmit() {
    this.postForm.value.account = this.accountService.getAccountId();
    this.forumService.postPost(this.forum._id, this.postForm.value);
    this.setCreatingPost();
  }

  public getBack(){
    this.router.navigateByUrl('/forums');
  }
}
