import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RelationComponent } from './relation.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: '对外站点权限'
        },
        children: [{
            path: '',
            component: RelationComponent,
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
export class RelationRoutingModule { }
