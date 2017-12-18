import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {isNullOrUndefined} from "util";
import {Account} from "../models/account.model";
import {Subscription} from "rxjs/Subscription";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  account: Account = new Account;
  subscription: Subscription;
  updatingAccount: boolean;
  loginForm: FormGroup;
  loggedInId: string;

  constructor(private accountService: AccountService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.accountService.accountChanged
      .subscribe((accountId: string) => {
          this.loggedInId = this.accountService.getAccountId();
        }
      );

    this.loggedInId = this.accountService.getAccountId();
    let accountId;

    this.route.params.subscribe(params => accountId = (params['accountId']));
    if (isNullOrUndefined(accountId)) {
      this.router.navigateByUrl('/games');
    } else {
      this.accountService.getAccount(accountId)
        .then((account) => {
          console.log(account);
          this.account = account
        })
        .catch((error) => console.log(error));
    }

    this.loginForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  updateAccount() {
    this.updatingAccount = !this.updatingAccount;
  }

  onSubmit() {
    this.accountService.updateAccount(this.account._id, this.loginForm.value)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  deleteAccount() {
    this.accountService.deleteAccount(this.account._id)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }
}
