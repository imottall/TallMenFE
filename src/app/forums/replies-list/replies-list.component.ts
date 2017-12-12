import { Component, OnInit } from '@angular/core';
import {Forum} from "../../models/forums/forum.model";
import {ForumService} from "../../services/forum.service";
import {ActivatedRoute, Router} from "@angular/router";
import {isNullOrUndefined, isUndefined} from "util";
import {Reply} from "../../models/forums/reply.model";
import {Post} from "../../models/forums/post.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-replies-list',
  templateUrl: './replies-list.component.html',
  styleUrls: ['./replies-list.component.css']
})
export class RepliesListComponent implements OnInit {
  post: Post = new Post('');
  replies: Reply[] = [];
  replyForm: FormGroup;
  postId: string;
  forumId: string;
  account: Account;
  creatingReply: boolean;

  constructor(private forumService: ForumService, private accountService: AccountService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.account = this.accountService.account;

    this.route.params.subscribe(params => {this.forumId = params['forumId']; this.postId = params['postId']});

    this.forumService.getReplies(this.forumId, this.postId)
      .then(forum => {this.post = forum[0].posts[0]; this.replies = forum[0].posts[0].replies})
      .catch(error => console.log(error));

    this.replyForm = new FormGroup({
      'message': new FormControl('', Validators.required),
      'author': new FormControl('')
    });
  }

  public setCreatingReply(){
    this.creatingReply = !this.creatingReply;
    this.replyForm.reset();
  }

  public onSubmit() {
    if(this.accountService.loggedIn) {
      this.replyForm.value.author = this.account.name;
    }
    this.replies.push(this.replyForm.value);
    this.forumService.postReply(this.forumId, this.postId, this.replyForm.value);
    this.setCreatingReply();
  }

  public getBack() {
    this.router.navigateByUrl('/' + this.forumId + '/posts');
  }
}
