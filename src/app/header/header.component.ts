import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {isNullOrUndefined} from "util";
import {Account} from "../models/account.model";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginForm: FormGroup;
  account: Account = new Account;
  subscription: Subscription;

  constructor(private accountService: AccountService){ }

  ngOnInit(){
    this.loginForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });

    const accountId = this.accountService.getAccountId();
    if(!isNullOrUndefined(accountId)) {
      this.accountService.getAccount(accountId)
        .then((account) => {
          if(!isNullOrUndefined(account)){
            this.account = account
          }
        })
        .catch((error) => console.log(error));
    }
  }

  public login() {
    this.accountService.validateLogin(this.loginForm.value)
      .then(account => {
        this.accountService.setAccountId(account._id);
        this.account = account;
        this.loginForm.reset();
        })
      .catch(error => console.log(error));
  }

  public register() {
    this.accountService.createAccount(this.loginForm.value)
      .then(account => {
        this.accountService.setAccountId(account._id);
        this.account = account;
        this.loginForm.reset();
      })
      .catch(error => console.log(error));
  }

  public logout() {
    this.account = new Account;
    this.accountService.removeAccountId();
    this.loginForm.reset();
  }
}
