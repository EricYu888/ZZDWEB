import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NoticeComponent } from './notice.component';
import { NoticeRoutingModule } from './notice-routing.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { UEditorModule } from 'ueditor';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NoticeRoutingModule,
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    UEditorModule.forRoot({
      // 指定ueditor.js路径目录
      path: 'assets/ueditor/',
      // 默认全局配置项
      options: {
        themePath: '/assets/ueditor/themes/',
      }
    })
  ],
  declarations: [NoticeComponent]

})
export class NoticeModule { }
