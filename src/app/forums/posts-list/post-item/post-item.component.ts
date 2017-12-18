import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../models/forums/post.model';
import {ForumService} from '../../../services/forum.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from "../../../services/account.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit{
  @Input() post: Post;
  account: Account;

  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    if(!isNullOrUndefined(this.post.account)) {
      this.accountService.getAccount("" + this.post.account)
        .then(account => {
          this.account = account;
          console.log(this.account)
        })
        .catch(error => console.log(error))
    }
  }

  public getReplies(){
    this.router.navigateByUrl('/' + this.post._id + '/replies');
  }

  public goToProfile(){
    this.router.navigateByUrl('/'+ this.post.account +'/profile')
  }
}
