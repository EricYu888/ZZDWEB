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
  weatherForecast = {
    ShortTerm: "",
    Xun: "",
    Month: "",
    Quater: "",
    Year: "",
    MonthReport: "",
  };
  isShortTermCollapsed: boolean = true;
  isXunCollapsed: boolean = true;
  isMonthCollapsed: boolean = true;
  isQuaterCollapsed: boolean = true;
  isYearCollapsed: boolean = true;
  isMonthReportCollapsed: boolean = true;

  loading: any;
  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public util: UtilService,
    public appLoadingService: AppLoadingService,
    public service: WeatherService,
    public appAlertService: AppAlertService) { }

  @ViewChild('ForcastContent_ShortTerm') ForcastContent_ShortTerm: UEditorComponent;
  @ViewChild('ForcastContent_Xun') ForcastContent_Xun: UEditorComponent;
  @ViewChild('ForcastContent_Month') ForcastContent_Month: UEditorComponent;
  @ViewChild('ForcastContent_Quater') ForcastContent_Quater: UEditorComponent;
  @ViewChild('ForcastContent_Year') ForcastContent_Year: UEditorComponent;
  @ViewChild('ForcastContent_MonthReport') ForcastContent_MonthReport: UEditorComponent;
  ngOnInit() {
  }

  updateWeatherForecast(param) {
    this.service.setWeatherForecast(param).then(res => {
      if (res.code === 'SUCCESS') {

      }
    })
  }

  loadWeatherForecast(param) {
    this.service.getWeatherForecast(param).then(res => {
      if (res.code === 'SUCCESS') {

      }
    })
  }

  save(forecastName) {
    let forecastContent = "";
    switch (forecastName) {
      case "ShortTerm":
        forecastContent = this.ForcastContent_ShortTerm.Instance.getAllHtml();
        break;
      case "Xun":
        forecastContent = this.ForcastContent_Xun.Instance.getAllHtml();
        break;
      case "Month":
        forecastContent = this.ForcastContent_Month.Instance.getAllHtml();
        break;
      case "Quater":
        forecastContent = this.ForcastContent_Quater.Instance.getAllHtml();
        break;
      case "Year":
        forecastContent = this.ForcastContent_Year.Instance.getAllHtml();
        break;
      case "MonthReport":
        forecastContent = this.ForcastContent_MonthReport.Instance.getAllHtml();
        break;
    }
    const param = {
      forecaseName: forecastName,
      content: forecastContent
    };
    this.updateWeatherForecast(param);
  }

  reset(forecastName) {
    const param = {
      forecaseName: forecastName
    };
    this.loadWeatherForecast(param);
  }
}

