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
  type= '';
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
    }
  
    getAll() {
  
    }
    addWeather() {
      this.router.navigate(['/weatherInfo'], { queryParams: { operate: 'add' } });
    }
    jumpToModify(item) {
  
    }
    deleteWeather(item) {
  
    }
    pageChanged(event) {
  
    }
  
    validatorStr(url) {
  
    }
}

