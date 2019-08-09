import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SiteComponent } from './site.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: '自动站点管理'
        },
        children: [{
            path: '',
            component: SiteComponent,
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
export class SiteRoutingModule { }
