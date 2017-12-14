import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../models/forums/post.model";
import {Reply} from "../../../models/forums/reply.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ForumService} from "../../../services/forum.service";
import {ActivatedRoute} from "@angular/router";
import {isNullOrUndefined} from "util";
import {AccountService} from "../../../services/account.service";
import {Account} from "../../../models/account.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-reply-item',
  templateUrl: './reply-item.component.html',
  styleUrls: ['./reply-item.component.css']
})
export class ReplyItemComponent implements OnInit {
  @Input() reply: Reply;
  replyForm: FormGroup;
  forumId: string;
  postId: string;
  account: Account;
  isLoggedIn: boolean;
  editing: boolean;
  subscription: Subscription;

  constructor(private forumService: ForumService, private accountService: AccountService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.accountService.accountChanged
    .subscribe(
      (account: Account) => {
        this.account = this.accountService.account;
        this.isLoggedIn = this.accountService.loggedIn;
      }
    );
    this.account = this.accountService.account;
    this.isLoggedIn = this.accountService.loggedIn;
    this.route.params.subscribe(params => {
      this.forumId = params['forumId'];
      this.postId = params['postId']});

    this.replyForm = new FormGroup({
      'message': new FormControl('', Validators.required),
      'authorId': new FormControl(''),
      'replyToAuthorId': new FormControl(''),
      'postId': new FormControl('')
    });
  }

  public deleteReply(){
    this.forumService.deleteReply(this.reply._id);
    this.reply = null;
  }

  public toggleEdit(){
    this.editing = !this.editing;
    this.replyForm.reset();
  }

  public onSubmit() {
    if(this.accountService.loggedIn) {
      this.replyForm.value.authorId = this.account._id;
    }
    this.replyForm.value.postId = this.postId;
    this.forumService.updateReply(this.reply._id, this.replyForm.value);
    this.toggleEdit();
  }
}
