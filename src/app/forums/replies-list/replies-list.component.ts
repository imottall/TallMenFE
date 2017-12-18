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
  post: Post = new Post;
  account: Account;
  creatingReply: boolean;
  subscription: Subscription;

  constructor(private forumService: ForumService, private accountService: AccountService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.postId = params['postId']);

    this.subscription = this.forumService.repliesChanged
      .subscribe(
        (replies: Reply[]) => {
          this.forumService.getReplies(this.postId)
            .then(post => { this.post = post;})
        }
      );

    this.forumService.getReplies(this.postId)
      .then(post => this.post = post)
      .catch(error => console.log(error));

    this.replyForm = new FormGroup({
      'message': new FormControl('', Validators.required),
      'account': new FormControl(''),
      'replyToAuthor': new FormControl('')
    });
  }

  public setCreatingReply(){
    this.creatingReply = !this.creatingReply;
    this.replyForm.reset();
  }

  public onSubmit() {
    this.replyForm.value.account = this.accountService.getAccountId();
    this.replies.push(this.replyForm.value);
    this.forumService.postReply(this.postId, this.replyForm.value);
    this.setCreatingReply();
  }

  public getBack() {
    this.router.navigateByUrl('/forums');
  }
}
