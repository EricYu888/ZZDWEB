import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpService, UtilService } from '../../shared/';
import { AppValidatorModule } from '../../components';
import { UsersComponent } from './users.component';
import { UserOperationComponent } from './operation/operation.component';
import { UsersRoutingModule } from './users-routing.module';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    AppValidatorModule,
    AlertModule.forRoot(),
  ],
  declarations: [UsersComponent, UserOperationComponent]
})
export class UsersModule { }
