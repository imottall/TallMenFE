import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../models/forums/post.model";
import {Reply} from "../../../models/forums/reply.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ForumService} from "../../../services/forum.service";
import {ActivatedRoute} from "@angular/router";
import {isNullOrUndefined} from "util";
import {AccountService} from "../../../services/account.service";
import {Account} from "../../../models/account.model";

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

  constructor(private forumService: ForumService, private accountService: AccountService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.account = this.accountService.account;
    this.isLoggedIn = this.accountService.loggedIn;
    this.route.params.subscribe(params => {this.forumId = params['forumId']; this.postId = params['postId']});

    this.replyForm = new FormGroup({
      'message': new FormControl('', Validators.required),
      'author': new FormControl('')
    });
  }

  public onSubmit() {
    if(this.accountService.loggedIn) {
      this.replyForm.value.author = this.account.name;
    }
    if(isNullOrUndefined(this.reply.replies)){
      this.reply.replies = [this.replyForm.value];
    } else {
      this.reply.replies.push(this.replyForm.value);
    }
    this.forumService.postReplyToReply(this.forumId, this.postId, this.reply._id, this.replyForm.value);
  }

  public deleteReply(){
    console.log('testSucceeded');
  }
}
