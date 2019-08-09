import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';


const routes: Routes = [
  {
      path: '',
      data: {
          title: '用户管理'
      },
      children: [{
          path: '',
          component: UsersComponent,
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
export class UsersRoutingModule { }
