import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TideComponent } from './tide.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: '潮汐时刻管理'
        },
        children: [{
            path: '',
            component: TideComponent,
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
export class TideoutingModule { }
