import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppAlertService } from '../../../components';
import { UtilService } from '../../../shared/';
import { NoticeService } from './../../../shared/services/notice.service';
import { AppValidatorInputComponent, AppValidatorSelectComponent } from '../../../components/app-validator';
import { AppLoadingService } from '../../../components/app-loading';
import { AlertConfig } from 'ngx-bootstrap/alert';


@Component({
  templateUrl: 'operation.component.html',
  styleUrls: ['./operation.component.scss'],
  providers: [NoticeService]
})
export class NoticeOperationComponent implements OnInit {

  id: any;
  add = false;
  modify = false;
  hasSubmit: boolean;
  notice = {
    id: '',
    title: '',
    category: '',
    newsAuthor: '',
    newsContent: '',
    publishTime: '',
    noticeIndex: 0,
    isActivated: true
  };

  loading: any;
  activitelist = [];
  alertsDismiss: any = [];
  @ViewChild('title') title;
  @ViewChild('pageContentEl') pageContentEl;


  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public util: UtilService,
    public appLoadingService: AppLoadingService,
    public service: NoticeService,
    public appAlertService: AppAlertService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
      const operate = params.operate;
      if (operate === 'add') {
        this.add = true;
        this.modify = false;
      } else {
        this.notice['id'] = this.id;
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
      this.loadNotice();
    }
  }

  loadNotice() {
    this.loading = true;
    const param = {
      id: this.id
    }
    this.service.getNoticeDetail(param).then(res => {
      this.loading = false;
      if (res.code === 'SUCCESS') {

      }
    })
  }

  saveNotice() {
    this.hasSubmit = true;
    if (this.title.test) {
      this.appLoadingService.showLoading();
      let callback = (res) => {
        this.appLoadingService.hideLoading();
        if (res.code === 'SUCCESS') {
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
            // this.addMsg('error', '部门已存在!');
            this.appAlertService.addAlert({ type: 'info', msg: '用户已存在!' });
          }
        }
      }
      if (this.add) {
        this.service.AddNotice(this.notice).then(callback);
      } else if (this.modify) {
        this.service.UpdataNotice(this.notice).then(callback);
      }
    }
  }
  changeStatus() {
    // console.log(!this.user.isActivated)
  }
}
