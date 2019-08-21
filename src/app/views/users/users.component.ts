import { Component, ElementRef, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from './../../shared/services/users.service';
import { AppModalService } from '../../components';
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
  totalItems: number;
  pageNum: number;
  pageSize: number;

  constructor(public userService: UsersService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public appModelService: AppModalService
  ) {
    if (!this.pageNum) {
      confirm
      this.pageNum = 1;
    }
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    const params = {
      searchContent: this.user,
      isActivated: this.isActivated,
      pageNumber: this.pageNum,
      pageSize: this.pageSize
    }
    this.userService.getAllUsers(params).then(res => {
      this.loading = false;
      console.log(res)
      if (res.result.isSuccess) {
        this.userList = res.result.data;
        this.totalItems = res.result.total;
      }
    })
  }


  addUser() {
    this.router.navigate(['/user/operation'], { queryParams: { operate: 'add' } });
  }
  jumpToModify(item) {
    this.router.navigate(['/user/operation'], { queryParams: { operate: 'modify', id: item.id } })
  }
  startUser(item) {

  }
  stopUser(item) {

  }
}
