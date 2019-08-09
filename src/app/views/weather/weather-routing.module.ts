import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './weather.component';


const routes: Routes = [
  {
      path: '',
      data: {
          title: '天气预报管理'
      },
      children: [{
          path: '',
          component: WeatherComponent,
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
export class WeatherRoutingModule { }
