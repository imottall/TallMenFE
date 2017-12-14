import { Component, OnInit } from '@angular/core';
import {ForumService} from "../../services/forum.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Reply} from "../../models/forums/reply.model";
import {Post} from "../../models/forums/post.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import {Account} from "../../models/account.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-replies-list',
  templateUrl: './replies-list.component.html',
  styleUrls: ['./replies-list.component.css']
})
export class RepliesListComponent implements OnInit {
  replies: Reply[] = [];
  replyForm: FormGroup;
  postId: string;
  post: Post;
  forumId: string;
  account: Account;
  creatingReply: boolean;
  subscription: Subscription;
  subscriptionTwo: Subscription;

  constructor(private forumService: ForumService, private accountService: AccountService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.accountService.accountChanged
      .subscribe(
        (account: Account) => {
          this.account = this.accountService.account;

        }
      );
    this.subscriptionTwo = this.forumService.repliesChanged
      .subscribe(
        (replies: Reply[]) => {
          this.forumService.getReplies(this.postId)
            .then(res => {
              this.replies = res;
            })
        }
      );
    this.route.params.subscribe(params => {
      this.forumId = params['forumId']; this.postId = params['postId'];
      this.forumService.getPost(this.postId)
        .then(post => {this.post = post[0]})
        .catch(error => console.log(error));

      this.forumService.getReplies(this.postId)
        .then(replies => {this.replies = replies; console.log(replies)})
        .catch(error => console.log(error));
    });

    this.account = this.accountService.account;

    this.replyForm = new FormGroup({
      'message': new FormControl('', Validators.required),
      'authorId': new FormControl(''),
      'replyToAuthorId': new FormControl(''),
      'postId': new FormControl('')
    });
  }

  public setCreatingReply(){
    this.creatingReply = !this.creatingReply;
    this.replyForm.reset();
  }

  public onSubmit() {
    if(this.accountService.loggedIn) {
      this.replyForm.value.authorId = this.account._id;
    }
    this.replyForm.value.postId = this.postId;
    this.replies.push(this.replyForm.value);
    this.forumService.postReply(this.replyForm.value);
    this.setCreatingReply();
  }

  public getBack() {
    this.router.navigateByUrl('/' + this.forumId + '/posts');
  }
}
