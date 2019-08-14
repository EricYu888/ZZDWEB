import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';


@Injectable()

export class WeatherService {
  constructor(public service: HttpService) {

  }

  public setWeatherForecast(params): Promise<any> {
    return;
  }
  public getWeatherForecast(params): Promise<any> {
    return;
  }
}
