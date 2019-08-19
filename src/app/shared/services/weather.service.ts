import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { DOMAIN } from '../constants'


@Injectable()

export class WeatherService {
  constructor(public service: HttpService) {

  }

  public getWeathers(type:number, pageSize:number, pageIndex:number): Promise<any> {
    let params = {
      "pageNumber": pageIndex,
      "pageSize": pageSize
    };
    return this.service.post("weather/GetWeathers",params);
  }

  public getWeatherDetail(id:number): Promise<any> {
    let url = "weather/GetWeather";
    let params = {
      "id": id
    };
    return this.service.post(url,params);
  }
  public AddWeather(type:number, title: string, content:string,): Promise<any> {
    let url = "weather/AddWeather";
    let params = {
      "title": title,
      "type": type,
      "content": content
    };
    return this.service.post(url,params);
  }
  public UpdateWeather(id:number,type:number, title: string, content:string,): Promise<any> {
    let url = "weather/UpdateWeather";
    let params = {
      "id": id,
      "title": title,
      "type": type,
      "content": content
    };
    return this.service.post(url,params);
  }
  
  public DeleteWeather(id:number): Promise<any> {
    let url = "weather/DeleteWeather";
    let params = {
      "id": id
    };
    return this.service.post(url,params);
  }
}
