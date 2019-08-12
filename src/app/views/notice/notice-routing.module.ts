import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NoticeComponent } from './notice.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: '通知管理'
        },
        children: [{
            path: '',
            component: NoticeComponent,
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
export class NoticeRoutingModule { }
