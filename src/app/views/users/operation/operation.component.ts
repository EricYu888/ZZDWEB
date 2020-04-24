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
  isfirstLoad = true;
  user = {
    account: '',
    userName: '',
    IMEICode: '',
    password: '',
    companyId: 0,
    isActivatedFlag: true,
    isActivated: '1',
    equipments: ''
  };
  validate_equip = true;
  siteList = [
    { "name": "Z0001", "checked": true },
    { "name": "Z0002", "checked": true },
    { "name": "Z0003", "checked": true },
    { "name": "Z0004", "checked": true },
    { "name": "Z0005", "checked": true },
    { "name": "Z0006", "checked": true },
    { "name": "Z0007", "checked": true },
    { "name": "Z0008", "checked": true },
    { "name": "Z0009", "checked": true },
    { "name": "Z0010", "checked": true },
  ];

  list = [
    "Z0001",
    "Z0002",
    "Z0003",
    "Z0004",
    "Z0005",
    "Z0006",
    "Z0007",
    "Z0008",
    "Z0009",
    "Z0010"
  ]

  allCheck = true;

  loading: any;
  activitelist = [];
  alertsDismiss: any = [];
  @ViewChild('account') account;
  @ViewChild('userName') userName;
  @ViewChild('IMEICode') imeiCode;
  @ViewChild('password') password;
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
    let selectSite = [];
    const param = {
      id: this.id
    }
    this.service.getUserDetail(param).then(res => {
      this.loading = false;
      if (res.result.isSuccess) {
        this.user.account = res.result.data.account;
        this.user.userName = res.result.data.userName;
        this.user.IMEICode = res.result.data.imeiCode;
        this.user.isActivatedFlag = res.result.data.isActivated === '1' ? true : false;
        this.user.isActivated = res.result.data.isActivated;
        this.user.password = res.result.data.password;
        this.user.equipments = res.result.data.equipments;
        if (res.result.data.equipments) {
          selectSite = res.result.data.equipments.split(';')
        }
        let notin = this.getArrDifference(this.list, selectSite);
        for (let i = 0; i < notin.length; i++) {
          if (notin[i].length > 0) {
            this.allCheck = false;
            let index = this.list.indexOf(notin[i]);
            this.siteList[index].checked = false;
          }
        }
      }
    })
  }
  getArrDifference(arr1, arr2) {
    return arr1.concat(arr2).filter(function (v, i, arr) {
      return arr.indexOf(v) === arr.lastIndexOf(v);
    });
  }



  saveUser() {
    this.hasSubmit = true;
    var siteList = "";
    if (this.account.test && this.userName.test && this.imeiCode.test && this.password.test) {
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
          this.addErrorMsg(res.result.errorMessage);
        }
      }
      if (this.add) {
        this.user.companyId = parseInt(sessionStorage.getItem('companyId'));
        this.user.isActivated = this.user.isActivatedFlag ? "1" : "0";
        this.siteList.forEach(res => {
          if (res.checked) {
            siteList += res.name + ";"
          }
        })
        if (siteList) {
          this.user.equipments = siteList.substr(0, siteList.length - 1);
        }
        else {
          this.user.equipments = ""
        }

        this.service.AddUser(this.user).then(callback);
      } else if (this.modify) {
        this.user.isActivated = this.user.isActivatedFlag ? "1" : "0";
        this.siteList.forEach(res => {
          if (res.checked) {
            siteList += res.name + ";"
          }
        })
        if (siteList) {
          this.user.equipments = siteList.substr(0, siteList.length - 1);
        } else {
          this.user.equipments = ""
        }
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
  addErrorMsg(msg) {
    this.alertsDismiss.push({
      type: 'danger',
      msg: `${msg}`,
      timeout: 5000
    });
  }
  checkChange(item) {
    let list = "";
    if (!item) {
      this.siteList.forEach((res, index) => {
        res.checked = this.allCheck;
      });
    } else {
      for (let i = 0, len = this.siteList.length; i < len; i++) {
        if (!this.siteList[i].checked) {
          this.allCheck = false;
          return;
        }
      }
      this.allCheck = true;
      this.siteList.forEach(res => {
        if (res.checked) {
          list += res.name + ";"
        }
      })
      this.user.equipments = list;
    }

  }
  close() {
    this.router.navigate(['/user'], { replaceUrl: true });
  }

  invalidate() {
    if (this.user.equipments) {
      this.validate_equip = this.user.equipments.length > 0 ? true : false;
      return this.validate_equip;
    }
    else {
      return false;
    }
  }

}
