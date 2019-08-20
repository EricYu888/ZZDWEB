import { Component, ViewChild, OnInit } from '@angular/core';
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
  totalItems: number;
  pageNum: number;
  pageSize: number;

  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public util: UtilService,
    public appLoadingService: AppLoadingService,
    public service: WeatherService,
    public appAlertService: AppAlertService) { }

  ngOnInit() {
    this.pageNum = 1;
    this.pageSize = 20;

    this.loadWeathers();
  }

  loadWeathers() {
    this.loading = true;
    this.service.getWeathers(this.title,this.type, this.pageSize, this.pageNum).then(res => {
      this.loading = false;
      console.log("res:", res);
      if (res.result.isSuccess) {
        this.weatherList = res.result.data;
      }
    })
  }
  getWeathers(){
    this.pageNum = 1;
    this.loadWeathers();
  }
  addWeather() {
    this.router.navigate(['/weatherInfo'], { queryParams: { operate: 'add' } });
  }
  jumpToModify(item) {
    this.router.navigate(['/weatherInfo'],{ queryParams: { operate: 'modify',id:item.id }});
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
  pageChanged(event) {
    this.pageNum = event.page;
    this.loadWeathers();
  }

  validatorStr(str) {
    return !this.util.isEmptyStr(str);
  }
}

