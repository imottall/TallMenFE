import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {isNullOrUndefined} from "util";
import {Account} from "../models/account.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn: Boolean;
  account: Account;

  constructor(private accountService: AccountService, private router: Router){ }

  ngOnInit(){
    this.isLoggedIn = false;
    this.loginForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  public onSubmit() {
    this.accountService.validateLogin(this.loginForm.value)
      .then(account => {
        if(isNullOrUndefined(account)){
        } else{
            this.accountService.account = this.loginForm.value;
            this.accountService.account._id = account._id;
            this.accountService.loggedIn = true;
            this.isLoggedIn = true;
            this.account = this.loginForm.value;
            this.account._id = account._id;
        }})
      .catch(error => console.log(error));
  }
}
