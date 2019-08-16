import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PictureComponent } from './picture.component';
import { PictureOperationComponent } from './operation/operation.component';
import { PictureRoutingModule } from './picture-routing.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AppValidatorModule } from '../../components';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PictureRoutingModule,
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    AppValidatorModule
  ],
  declarations: [PictureComponent, PictureOperationComponent],
  // exports: [PictureComponent]

})
export class PictureModule { }
