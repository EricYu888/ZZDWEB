import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NoticeService } from './../../shared/services/notice.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss'],
  providers: [NoticeService]
})
export class NoticeComponent implements OnInit {
  title = '';
  noticeList = [];
  loading = true;
  alertsDismiss: any = [];
  totalItems: number;
  pageNum: number;
  pageSize: number;


  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public service: NoticeService,
  ) {

  }

  ngOnInit() {
  }

  getAll() {

  }
  addNotice() {
    this.router.navigate(['/notice/operation'], { queryParams: { operate: 'add' } });
  }
  jumpToModify(item) {

  }
  deleteNotice(item) {

  }
  pageChanged(event) {

  }
}

