import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpService, UtilService } from '../../shared/';

import { SiteComponent } from './site.component';
import { SiteRoutingModule } from './site-routing.module';
// import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SiteRoutingModule,
    // AlertModule.forRoot(),
  ],
  declarations: [SiteComponent]
})
export class SiteModule { }
