import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppAlertService } from '../../../components';
import { UtilService } from '../../../shared/';
import { UsersService } from './../../../shared/services/users.service';
import { AppValidatorInputComponent, AppValidatorSelectComponent } from '../../../components/app-validator';
import { AppLoadingService } from '../../../components/app-loading';
import { AlertConfig } from 'ngx-bootstrap/alert';


@Component({
  templateUrl: 'operation.component.html',
  styleUrls: ['./operation.component.scss'],
  providers: [UsersService]
})
export class UserOperationComponent implements OnInit {

  id: any;
  add = false;
  modify = false;
  hasSubmit: boolean;
  user = {
    accountName: '',
    userName: '',
    IMEICode: '',
    isActivatedFlag: true,
    isActivated: '1'

  };

  loading: any;
  activitelist = [];
  alertsDismiss: any = [];
  @ViewChild('accountName') accountName;
  @ViewChild('userName') userName;
  @ViewChild('IMEICode') imeiCode;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public util: UtilService,
    public appLoadingService: AppLoadingService,
    public service: UsersService,
    public appAlertService: AppAlertService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
      const operate = params.operate;
      if (operate === 'add') {
        this.add = true;
        this.modify = false;
      } else {
        this.user['id'] = this.id;
        this.add = false;
        this.modify = true;
      }
    });
  }

  validatorStr(str) {
    return !this.util.isEmptyStr(str);
  }
  validatorPhone(str) {
    return this.util.validatorPhone(str);
  }
  validatorCode(str) {
    return this.util.validatorCode(str);
  }
  ngOnInit() {
    if (this.id) {
      this.loadUser();
    }
  }

  loadUser() {
    this.loading = true;
    const param = {
      id: this.id
    }
    this.service.getUserDetail(param).then(res => {
      this.loading = false;
      if (res.result.isSuccess) {
        this.user.accountName = res.result.data.accountName;
        this.user.userName = res.result.data.userName;
        this.user.IMEICode = res.result.data.imeiCode;
        this.user.isActivatedFlag = res.result.data.isActivated === '1' ? true : false;
        this.user.isActivated = res.result.data.isActivated;
        // console.log(res.result.data.isActivated)
      }
    })
  }

  saveUser() {
    this.hasSubmit = true;
    if (this.accountName.test && this.userName.test && this.imeiCode.test) {
      this.appLoadingService.showLoading();
      let callback = (res) => {
        this.appLoadingService.hideLoading();
        if (res.result.isSuccess) {
          let resultMsg = '';
          if (this.add) {
            resultMsg = 'addSuccess';
            this.appAlertService.addAlert({ type: 'info', msg: '添加成功' });
          } else if (this.modify) {
            this.appAlertService.addAlert({ type: 'info', msg: '修改成功' });
            resultMsg = 'modifySuccess';
          }
          this.router.navigate(['/user'], { replaceUrl: true, queryParams: { result: resultMsg } });
        } else if (res.code === 'EXPIRE') {
          this.router.navigate(['/logout'], { replaceUrl: true });
        } else {
          if (res.msg === '用户已存在') {
            this.appAlertService.addAlert({ type: 'info', msg: '用户已存在!' });
          }
        }
      }
      if (this.add) {
        // this.user.isActivatedFlag 
        this.user.isActivated = this.user.isActivatedFlag ? "1" : "0";
        this.service.AddUser(this.user).then(callback);
      } else if (this.modify) {
        this.user.isActivated = this.user.isActivatedFlag ? "1" : "0";
        console.log(this.user)
        this.service.UpdataUser(this.user).then(callback);
      }
    }
  }
  changeStatus() {
    if (this.user.isActivatedFlag) {
      this.user.isActivated = '1';
    }
    else {
      this.user.isActivated = '0';
    }
  }
}
