import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpService, UtilService } from '../../shared/';

import { WeatherInfoComponent } from './weather-info.component';
import { WeatherInfoRoutingModule } from './weather-info-routing.module';

import { TabsModule } from 'ngx-bootstrap/tabs';
// import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WeatherInfoRoutingModule,
    // AlertModule.forRoot(),
    TabsModule,
  ],
  declarations: [WeatherInfoComponent]
})
export class WeatherInfoModule { }
