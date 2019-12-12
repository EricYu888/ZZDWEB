import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppAlertService } from '../../components';
import { UtilService } from '../../shared/';
import { WeatherService } from '../../shared/services/weather.service';
import { UEditorComponent } from 'ngx-ueditor';
import { AppLoadingService } from '../../components/app-loading';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  providers: [WeatherService]
})
export class WeatherComponent implements OnInit {
  title = '';
  type = null;
  weatherList = [];
  loading = true;
  alertsDismiss: any = [];
  totalPages: number;
  pageSize: number = 20;
  @Input() pageNum: number;
  @Input() totalItems: number = 20;
  @Output() pageChanges: EventEmitter<Page> = new EventEmitter();


  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public util: UtilService,
    public appLoadingService: AppLoadingService,
    public service: WeatherService,
    public appAlertService: AppAlertService) { }

  ngOnInit() {
    this.pageNum = 1;
    this.pageSize = 10;

    this.loadWeathers();
  }

  loadWeathers(event = null) {
    this.weatherList=[]
    this.loading = true;
    this.service.getWeathers(this.title, this.type, parseInt(sessionStorage.getItem('companyId')), this.pageSize, this.pageNum).then(res => {
      this.loading = false;
      console.log("res:", res);
      if (res.result.isSuccess) {
        this.weatherList = res.result.data;
        this.calculatePaging(res.result.total,event);
      }
    })
  }
  calculatePaging(total,event = null) {
    this.totalItems = total;
    this.totalPages = Math.floor((total - 1) / this.pageNum) + 1;
    this.pageChanges.emit(event);
  }
  getWeathers() {
    this.pageNum = 1;
    this.loadWeathers();
  }
  viewWeather(item) {
    this.router.navigate(['/weatherInfo'], { queryParams: { id: item.id } });
  }
  addWeather() {
    this.router.navigate(['/weatherInfo'], { queryParams: { operate: 'add' } });
  }
  jumpToModify(item) {
    this.router.navigate(['/weatherInfo'], { queryParams: { operate: 'modify', id: item.id } });
  }
  deleteWeather(item) {
    let id = item.id;
    this.service.DeleteWeather(id).then(res => {
      this.loading = false;
      console.log("res:", res);
      if (res.result.isSuccess) {
        this.loadWeathers();
      }
    })
  }
  pageChanged(event) {console.log("event:",event);
    this.pageNum = event.page;
    this.pageSize = event.itemsPerPage;
    this.loadWeathers(event);
  }

  validatorStr(str) {
    return !this.util.isEmptyStr(str);
  }
}

export class Page {
  constructor(
    public itemsPerPage: number,
    public page: number
  ) {
    this.itemsPerPage = 3;
    this.page = 1;
  }
}