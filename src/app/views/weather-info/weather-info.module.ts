import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpService, UtilService } from '../../shared/';

import { WeatherInfoComponent } from './weather-info.component';
import { WeatherInfoRoutingModule } from './weather-info-routing.module';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppValidatorModule } from '../../components';
import { UEditorModule } from 'ngx-ueditor'
// import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WeatherInfoRoutingModule,
    AppValidatorModule,
    // AlertModule.forRoot(),
    TabsModule,
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
  declarations: [WeatherInfoComponent]
})
export class WeatherInfoModule { }
