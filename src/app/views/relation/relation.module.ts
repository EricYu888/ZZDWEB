import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpService, UtilService } from '../../shared/';

import { RelationComponent } from './relation.component';
import { RelationRoutingModule } from './relation-routing.module';
import { AlertModule } from 'ngx-bootstrap/alert';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RelationRoutingModule,
        AlertModule.forRoot(),
    ],
    declarations: [RelationComponent],
    providers: [
        HttpService, UtilService
    ]
})
export class RelationModule { }
