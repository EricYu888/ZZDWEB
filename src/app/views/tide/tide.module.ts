import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpService, UtilService } from '../../shared/';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { TideComponent } from './tide.component';
import { TideoutingModule } from './tide-routing.module';
// import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TideoutingModule,
    // AlertModule.forRoot(),
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
  ],
  declarations: [TideComponent]
})
export class TideModule { }
