import { Component, OnInit } from '@angular/core';
import {TestService} from '../services/testService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  testdatausers: string[];
  testdataneousers: string[];

  constructor(public testService: TestService) {}

  onTestMDB() {
    return this.testService.getUsers();
  }

  ngOnInit() {
    this.testService.getUsers()
      .then(testdata => this.testdatausers = testdata)
      .catch(error => console.log(error));
    this.testService.getNeoUsers()
      .then(testdata => this.testdataneousers = testdata)
      .catch(error => console.log(error));
  }

}
