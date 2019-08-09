import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpService, UtilService } from '../../shared/';

import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
// import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    // AlertModule.forRoot(),
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
