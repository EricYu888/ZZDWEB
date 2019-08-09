import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { LoginService } from '../../shared/services/login.service';
import { UtilService } from '../../shared/';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  @ViewChild('usernameInput') usernameInput: ElementRef;
  userName: any;
  @ViewChild('passwordInput') passwordInput: ElementRef;
  password: any;
  haslogin = false;
  alertsDismiss: any = [];

  loginbtnable = false;
  loginbtntext = '登录';
  canceltext = '取消';

  constructor(public router: Router, public util: UtilService, public loginDao: LoginService) { }

  ngOnInit() {

  }

  public passwordfocus() {
    this.passwordInput.nativeElement.focus();
  }

  public judgeUser() {
    this.showloading();
    if (this.util.isEmptyStr(this.userName) || this.util.isEmptyStr(this.password)) {
      this.alertsDismiss.push({
        type: 'danger',
        msg: `` + '用户名或密码不能为空！',
        timeout: 5000
      });
      this.endloading()
      return;
    } else {
      this.loginDao.login({ username: this.userName, password: this.password }).then(res => {
        if (res.result.isSuccess) {
          sessionStorage.setItem('username', res.result.data[0].username)
          console.log(res.result.data[0].username)
          this.router.navigate(['/relation']);
        } else {
          this.alertsDismiss.push({
            type: 'danger',
            msg: `` + '用户名或密码错误！',
            timeout: 5000
          });
          this.endloading();
        }
      })
    }
  }

  public showloading() {
    this.alertsDismiss = [];
    this.loginbtnable = true;
    this.loginbtntext = '登录中...';
  }

  public endloading() {
    this.loginbtnable = false;
    this.loginbtntext = '登录';
  }
}

