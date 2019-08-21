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
  currentItem;

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

    this.currentItem = item.id;
    let okCallback = () => {
      let id = this.currentItem;
      this.currentItem = null;
      this.userService.changeStatus({ id: item.id, isActivated: "1" }).then(res => {
        if (res.result.isSuccess) {
          this.addMsg('success', '启用成功！')
          this.getAll();
        } else {
          this.addMsg('danger', res.result.err)
        }
      })
    }
    let cancelCallback = () => {
      this.currentItem = null;
    }
    this.appModelService.showModal({
      type: 'confirm',
      modalContent: '您确定要启用该用户么？',
      okcallback: okCallback,
      cancelcallback: cancelCallback
    })


  }
  stopUser(item) {
    this.currentItem = item.id;
    let okCallback = () => {
      let id = this.currentItem;
      this.currentItem = null;
      this.userService.changeStatus({ id: item.id, isActivated: "0" }).then(res => {
        if (res.result.isSuccess) {
          this.addMsg('success', '禁用成功！')
          this.getAll();
        } else {
          this.addMsg('danger', res.result.err)
        }
      })
    }
    let cancelCallback = () => {
      this.currentItem = null;
    }
    this.appModelService.showModal({
      type: 'confirm',
      modalContent: '您确定要禁用该用户么？',
      okcallback: okCallback,
      cancelcallback: cancelCallback
    })
  }
  private addMsg(type, msg) {
    this.alertsDismiss = [];
    this.alertsDismiss.push({
      type: type,
      msg: `${msg}`,
      timeout: 5000
    });
  }
}
