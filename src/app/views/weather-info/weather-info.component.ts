import { Component,ViewChild, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AppAlertService } from '../../components';
import { UtilService } from '../../shared/';
import { WeatherService } from '../../shared/services/weather.service';
import { AppLoadingService } from '../../components/app-loading';
@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss'],
  providers: [WeatherService]
})
export class WeatherInfoComponent implements OnInit {
  id: any;
  add = false;
  modify = false;
  hasSubmit: boolean;
  weather = {
    id: null,
    title: '',
    type: 1,
    content: '',
    publishTime: '',
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
  @ViewChild('displayIndex') displayIndex;
  @ViewChild('pageContentEl') pageContentEl;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public util: UtilService,
    public appLoadingService: AppLoadingService,
    private sanitizer: DomSanitizer,
    public service: WeatherService,
    public appAlertService: AppAlertService) {
      this.activatedRoute.queryParams.subscribe(params => {
        this.id = params.id;
        const operate = params.operate;
        if (operate === 'add') {
          this.add = true;
          this.modify = false;
        } else if (operate === 'modify') {
          this.weather['id'] = this.id;
          this.add = false;
          this.modify = true;
        } else {
          this.add = false;
          this.modify = false;
          this.detailView = true;
        }
      }); }

  ngOnInit() {
    if (this.id) {
      this.loadWeather();
    }
  }

  loadWeather() {
    this.loading = true;
    this.service.getWeatherDetail(this.id).then(res => {
      this.loading = false;
      if (res.result.isSuccess) {
        this.weather.id= res.result.data.id;
        this.weather.title= res.result.data.title;
        this.weather.type= res.result.data.type;
        this.weather.content= res.result.data.content;
        this.weather.publishTime= res.result.data.lastModificationTime;
      }
    })
  }

  saveWeather() {console.log("asdfasdfsdf");
    this.hasSubmit = true;
    if (this.title.test) {
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
          this.router.navigate(['/weather'], { replaceUrl: true, queryParams: { result: resultMsg } });
        } 
      }
      if (this.add) {console.log("add weather");
        this.service.AddWeather(this.weather.type, this.weather.title,this.weather.content,parseInt(sessionStorage.getItem('companyId'))).then(callback);
      } else if (this.modify) {console.log("modify weather");
        this.service.UpdateWeather(this.weather.id,this.weather.type, this.weather.title,this.weather.content).then(callback);
      }
    }
  }
  clolseWeather() {
    this.router.navigate(['/weather'], { replaceUrl: true});
  }
  validatorStr(str) {
    return !this.util.isEmptyStr(str);
  }
  validatorPhone(str) {
    return this.util.validatorPhone(str);
  }
  validatorNum(str) {
    return this.util.validatorNum(str);
  }
  changeStatus() {
    // console.log(!this.user.isActivated)
  }
  _ready(event) {
    console.log(event);
    //  this.pageContentEl.Instance.iframe.clientHeight = 200;
  }
}
