import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../models/forums/post.model";
import {Reply} from "../../../models/forums/reply.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ForumService} from "../../../services/forum.service";
import {ActivatedRoute, Router} from "@angular/router";
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
  @Input() reply: Reply = new Reply;
  replyForm: FormGroup;
  forumId: string;
  postId: string;
  accountId: string;
  editing: boolean;
  subscription: Subscription;
  account: Account;
  replyToAccount: Account;
  replying: boolean;

  constructor(private forumService: ForumService, private accountService: AccountService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.forumId = params['forumId'];
      this.postId = params['postId']
    });

    if(!isNullOrUndefined(this.reply.account)) {
      this.accountService.getAccount("" + this.reply.account)
        .then(account => {
          this.account = account;
          console.log(this.account)
        })
        .catch(error => console.log(error))
    }

    if(!isNullOrUndefined(this.reply.replyToAuthor)) {
      this.accountService.getAccount("" + this.reply.replyToAuthor)
        .then(account => {
          this.replyToAccount = account;
          console.log(this.account)
        })
        .catch(error => console.log(error))
    }

    this.subscription = this.accountService.accountChanged
      .subscribe(
        (accountId: string) => this.accountId = this.accountService.getAccountId()
      );

    this.accountId = this.accountService.getAccountId();

    this.replyForm = new FormGroup({
      'message': new FormControl('', Validators.required),
      'authorId': new FormControl(''),
      'replyToAuthorId': new FormControl(''),
      'postId': new FormControl('')
    });
  }

  public deleteReply(){
    this.forumService.deleteReply(this.reply._id);
  }

  public toggleEdit(){
    this.editing = !this.editing;
    this.replyForm.reset();
  }

  public toggleReply(){
    this.replying = !this.replying;
    this.replyForm.reset();
  }

  public onSubmit() {
    this.replyForm.value.postId = this.postId;
    if(this.editing) {
      this.forumService.updateReply(this.reply._id, this.replyForm.value);
      this.toggleEdit();
    }
    else if(this.replying) {
      if(!isNullOrUndefined(this.account)){
        this.replyForm.value.replyToAuthor = this.account._id;
        this.forumService.postReply(this.postId, this.replyForm.value);
        this.toggleReply();
      }
    }
  }

  public goToProfile(){
    this.router.navigateByUrl('/'+ this.reply.account +'/profile')
  }
}
