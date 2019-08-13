import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { WeatherService } from '../../shared/services/weather.service';
@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss'],
  providers: [WeatherService]
})
export class WeatherInfoComponent implements OnInit {

  weatherForecast = {
    ShortTerm: null,
    Xun: null,
    Month: null,
    Quater: null,
    Year: null,
    MonthReport: null,
  };

  constructor(
    private sanitizer: DomSanitizer,
    public service: WeatherService) { }

  ngOnInit() {
    this.loadWeatherForecast("ShortTerm");
    this.loadWeatherForecast("Xun");
    this.loadWeatherForecast("Month");
    this.loadWeatherForecast("Quater");
    this.loadWeatherForecast("Year");
    this.loadWeatherForecast("MonthReport");
  }

  bindHtml(content, forecastName){
    switch (forecastName) {
      case "ShortTerm":
          this.weatherForecast.ShortTerm = this.sanitizer.bypassSecurityTrustHtml(content);
        break;
      case "Xun":
          this.weatherForecast.Xun = this.sanitizer.bypassSecurityTrustHtml(content);
        break;
      case "Month":
          this.weatherForecast.Month = this.sanitizer.bypassSecurityTrustHtml(content);
        break;
      case "Quater":
          this.weatherForecast.Quater = this.sanitizer.bypassSecurityTrustHtml(content);
        break;
      case "Year":
          this.weatherForecast.Year = this.sanitizer.bypassSecurityTrustHtml(content);
        break;
      case "MonthReport":
          this.weatherForecast.MonthReport = this.sanitizer.bypassSecurityTrustHtml(content);
        break;
    }
  }

  loadWeatherForecast(forecastName) {    
    const param = {
      forecaseName: forecastName
    };
    this.service.getWeatherForecast(param).then(res => {
      if (res.code === 'SUCCESS') {
          this.bindHtml(res.content,forecastName);
      }
    })
  }
}
