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
    userName: '',
    phoneNum: '',
    IMEICode: '',
    isActivated: 1
  };

  loading: any;
  activitelist = [];
  alertsDismiss: any = [];
  @ViewChild('userName') userName;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public util: UtilService,
    public appLoadingService: AppLoadingService,
    public service: UsersService,
    public appAlertService: AppAlertService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
      let operate = params.operate;
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
    return !this.util.validatorPhone(str);
  }
  ngOnInit() {

  }
  saveUser() {

  }
}
