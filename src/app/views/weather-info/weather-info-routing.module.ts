import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WeatherInfoComponent } from './weather-info.component';


const routes: Routes = [
  {
      path: '',
      data: {
          title: '天气预报信息管理'
      },
      children: [{
          path: '',
          component: WeatherInfoComponent,
          data: {
              title: ''
          }
      }]
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherInfoRoutingModule { }
