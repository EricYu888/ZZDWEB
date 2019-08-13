import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NoticeService } from './../../shared/services/notice.service'
@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {
  title = '';
  noticeList = [];
  loading = true;
  alertsDismiss: any = [];
  constructor() {

  }

  ngOnInit() {
  }

  getAll() {

  }
  addNotice() {

  }
  jumpToModify(item) {

  }
  deleteNotice(item) {

  }
}

