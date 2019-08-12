import { Component, ElementRef, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { RelationService } from './../../shared/services/relation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from './../../shared/services/users.service'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService, RelationService]
})
export class UsersComponent implements OnInit {
  user = '';
  userList = [];
  loading = true;
  alertsDismiss: any = [];
  isActivated = '';
  constructor(public userService: UsersService,
    public service: RelationService,
    public router: Router
    ) { }

  ngOnInit() {
    this.bindUserAll();
  }

  bindUserAll() {

  }

  getAll() {

  }
  addUser() {
    this.router.navigate(['/user/operation'], { queryParams: { operate: 'add' } });
  }

}
