import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserOperationComponent } from './operation/operation.component';

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
    },
    {
      path: 'operation',
      component: UserOperationComponent,
      data: {
        title: '操作'
      }
    }
    ]
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
