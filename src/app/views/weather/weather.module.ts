import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpService, UtilService } from '../../shared/';

import { WeatherComponent } from './weather.component';
import { WeatherRoutingModule } from './weather-routing.module';
// import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WeatherRoutingModule,
    // AlertModule.forRoot(),
  ],
  declarations: [WeatherComponent]
})
export class WeatherModule { }
