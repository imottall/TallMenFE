import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {Reply} from "../models/forums/reply.model";
import {Router} from "@angular/router";
import {isNullOrUndefined} from "util";
import {Account} from "../models/account.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  replies: Reply[];
  account: Account;
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    if(isNullOrUndefined(this.accountService.account)){
      this.router.navigateByUrl('/home');
    }
    this.account = this.accountService.account;
    this.accountService.getReplies(this.accountService.account._id)
      .then(replies =>{ this.replies = replies; console.log(replies);})
      .catch(error => console.log(error));
  }
}
