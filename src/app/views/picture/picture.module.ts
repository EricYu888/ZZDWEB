import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { PictureComponent } from './picture.component';
import { PictureRoutingModule } from './picture-routing.module';
import { AlertModule } from 'ngx-bootstrap/alert';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PictureRoutingModule,
    AlertModule.forRoot(),
  ],
  declarations: [PictureComponent],
  // exports: [PictureComponent]

})
export class PictureModule { }
