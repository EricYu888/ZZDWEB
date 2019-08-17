import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';


@Injectable()

export class WeatherService {
  constructor(public service: HttpService) {

  }

  public setWeatherForecast(params): Promise<any> {
    return;
  }
  public getWeatherDetail(params): Promise<any> {
    return;
  }
  public AddWeather(params): Promise<any> {
    return;
  }
  public UpdataWeather(params): Promise<any> {
    return;
  }
}
