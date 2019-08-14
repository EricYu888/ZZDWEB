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
    this.loadWeatherForecast();
  }

  bindHtml(forecastes){
    if(forecastes == null) return;
    forecastes.forEach(element => {    
      let forecastName  = element.forecastName;
      let content  = element.content;
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
    });
  }

  loadWeatherForecast() {    
    const param = {
      forecaseName: ""
    };
    this.service.getWeatherForecast(param).then(res => {
      if (res.code === 'SUCCESS') {
          this.bindHtml(res.data);
      }
    })
  }
}
