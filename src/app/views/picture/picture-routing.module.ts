import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PictureComponent } from './picture.component';
import { PictureOperationComponent } from '../picture/operation/operation.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '图片管理'
    },
    children: [{
      path: '',
      component: PictureComponent,
      data: {
        title: ''
      }
    },
    {
      path: 'operation',
      component: PictureOperationComponent,
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
export class PictureRoutingModule { }
