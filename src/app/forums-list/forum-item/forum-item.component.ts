import {Component, Input, OnInit} from '@angular/core';
import {Forum} from '../../models/forums/forum.model';

@Component({
  selector: 'app-forum-item',
  templateUrl: './forum-item.component.html',
  styleUrls: ['./forum-item.component.css']
})
export class ForumItemComponent implements OnInit {
  @Input() forum: Forum;

  constructor() { }

  ngOnInit() {}

}
