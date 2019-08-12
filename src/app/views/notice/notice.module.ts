import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { NoticeComponent } from './notice.component';
import { NoticeRoutingModule } from './notice-routing.module';
import { AlertModule } from 'ngx-bootstrap/alert';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NoticeRoutingModule,
        AlertModule.forRoot(),
    ],
    declarations: [NoticeComponent]

})
export class NoticeModule { }
