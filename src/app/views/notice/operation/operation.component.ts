import { Component, ViewChild, OnInit, ɵALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
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
    // displayIndex: '',
    isActivated: true
  };
  detailView = false;
  loading: any;
  activitelist = [];
  alertsDismiss: any = [];
  
  ueditor_config = {
    toolbars: [
      [
        'FullScreen', // 全屏
        'bold', // 加粗
        'italic', // 斜体
        'underline', // 下划线
        '|',
        'forecolor',  // 字体颜色
        'backcolor',  // 背景色
        'fontfamily', // 字体
        'fontsize', // 字号
        '|',
        'insertorderedlist',  // 有序列表
        'insertunorderedlist',  // 无序列表
        '|',
        'justifyleft',  // 左对齐
        'justifycenter',  // 居中对齐
        'justifyright', // 右对齐
        'justifyjustify', // 两端对齐
        '|',
        'link', // 超链接
        'unlink', // 取消链接
        'inserttable', // 插入表格
        '|',
        'insertimage', //多图上传
        // 'simpleupload', // 单图上传
      ]
    ],
    autoClearinitialContent: true,  // 自动清除初始内容
    wordCount: true, // 文字计数
    focus: false, // 初始化后获得焦点
    initialFrameHeight: 200, // 设置高度
    initialFrameWidth: '100%', // 设置宽度
    enableDragUpload: true, // 启用拖放上传
    enablePasteUpload: true, // 启用粘贴上传
    imageScaleEnabled: true, // 启用图片拉伸缩放
    autoHeightEnabled: true, // 自动高度
  };

  @ViewChild('title') title;
  @ViewChild('newsAuthor') newsAuthor;
  // @ViewChild('displayIndex') displayIndex;
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
      } else if (operate === 'modify') {
        this.notice['id'] = this.id;
        this.add = false;
        this.modify = true;
      } else {
        this.add = false;
        this.modify = false;
        this.detailView = true;
      }
    });
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
      if (res.result.isSuccess === true) {
        this.notice.title = res.result.data.title;
        this.notice.newsAuthor = res.result.data.newsAuthor;
        this.notice.newsContent = res.result.data.newsContent;
      }
    })
  }

  saveNotice() {

    this.hasSubmit = true;

    //if (this.newsAuthor.test && this.displayIndex.test && this.imeiCode.test) {
    if (this.title.test && this.newsAuthor.test) {
      this.appLoadingService.showLoading();
      let callback = (res) => {
        this.appLoadingService.hideLoading();
        if (res.result.isSuccess === true) {
          let resultMsg = '';
          if (this.add) {
            resultMsg = 'addSuccess';
            this.appAlertService.addAlert({ type: 'info', msg: '添加成功' });
          } else if (this.modify) {
            this.appAlertService.addAlert({ type: 'info', msg: '修改成功' });
            resultMsg = 'modifySuccess';
          }
          this.router.navigate(['/notice'], { replaceUrl: true, queryParams: { result: resultMsg } });
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
        let param = {
          Title: this.notice.title,
          NewsAuthor: this.notice.newsAuthor,
          NewsContent: this.notice.newsContent,
          companyId: sessionStorage.getItem('companyId')
        }
        this.service.AddNotice(param).then(callback);
      } else if (this.modify) {
        let param = {
          id: this.id,
          Title: this.notice.title,
          NewsAuthor: this.notice.newsAuthor,
          NewsContent: this.notice.newsContent
        }
        this.service.UpdataNotice(param).then(callback);
      }
    }
    else {

    }
  }
  close() {
    this.router.navigate(['/notice'], { replaceUrl: true});
  }
  validatorStr(str) {
    return !this.util.isEmptyStr(str);
  }

  validatorNum(str) {
    return this.util.validatorNum(str);
  }
  changeStatus() {
    // console.log(!this.user.isActivated)
  }
  private addMsg(type, msg) {
    this.alertsDismiss = [];
    this.alertsDismiss.push({
      type: type,
      msg: `${msg}`,
      timeout: 3000
    });
  }
}
