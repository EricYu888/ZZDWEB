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
    id: '',
    title: '',
    type: '1',
    content: '',
    publishTime: '',
    isActivated: true
  };
  detailView = false;
  loading: any;
  activitelist = [];
  alertsDismiss: any = [];
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
    const param = {
      id: this.id
    }
    this.service.getWeatherDetail(param).then(res => {
      this.loading = false;
      if (res.code === 'SUCCESS') {

      }
    })
  }

  saveWeather() {
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
        this.service.AddWeather(this.weather).then(callback);
      } else if (this.modify) {
        this.service.UpdataWeather(this.weather).then(callback);
      }
    }
  }
  clolseWeather() {

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
