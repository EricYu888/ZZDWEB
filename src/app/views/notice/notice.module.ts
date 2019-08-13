import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NoticeComponent } from './notice.component';
import { NoticeRoutingModule } from './notice-routing.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NoticeOperationComponent } from './operation/operation.component';
import { AppValidatorModule } from '../../components';
//  import { UMeditorModule } from 'ngx-umeditor';
import { UEditorModule } from 'ngx-ueditor'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NoticeRoutingModule,
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    AppValidatorModule,
    UEditorModule.forRoot({
      js: [
        `../../../assets/ueditor/ueditor.config.js`,
        `../../../assets/ueditor/ueditor.all.js`,
      ],
      // 默认前端配置项
      options: {
        UEDITOR_HOME_URL: '../../../assets/ueditor/'
      }
    })
  ],
  declarations: [NoticeComponent, NoticeOperationComponent]

})
export class NoticeModule { }
