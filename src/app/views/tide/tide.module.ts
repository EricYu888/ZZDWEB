import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpService, UtilService } from '../../shared/';

import { TideComponent } from './tide.component';
import { TideoutingModule } from './tide-routing.module';
// import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TideoutingModule,
    // AlertModule.forRoot(),
  ],
  declarations: [TideComponent]
})
export class TideModule { }
