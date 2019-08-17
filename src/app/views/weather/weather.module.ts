import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HttpService, UtilService } from '../../shared/';
import { AlertModule } from 'ngx-bootstrap/alert';
import { WeatherComponent } from './weather.component';
import { WeatherRoutingModule } from './weather-routing.module';
import { AppValidatorModule } from '../../components';
// import { AlertModule } from 'ngx-bootstrap/alert';
import { UEditorModule } from 'ngx-ueditor'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WeatherRoutingModule,
    // AlertModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    AppValidatorModule,
    UEditorModule.forRoot({
      js: [
        `../../../assets/ueditor/ueditor.config.js`,
        `../../../assets/ueditor/ueditor.all.js`,
      ],
      // 默认前端配置项
      options: {
        UEDITOR_HOME_URL: '../../../assets/ueditor/'
      }
    })
  ],
  declarations: [WeatherComponent]
})
export class WeatherModule { }
