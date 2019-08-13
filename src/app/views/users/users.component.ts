import { Component, ElementRef, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from './../../shared/services/users.service'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {
  user = '';
  userList = [];
  loading = true;
  alertsDismiss: any = [];
  isActivated = '';
  constructor(public userService: UsersService,
    public router: Router
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {

  }


  addUser() {
    this.router.navigate(['/user/operation'], { queryParams: { operate: 'add' } });
  }
  jumpToModify(item) {

  }
  startUser(item) {

  }
  stopUser() {

  }
}
