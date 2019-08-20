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
  pageSize = 10;


  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public service: NoticeService,
  ) {
    if(!this.pageNum)
    {
      this.pageNum=1;
    }
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    const params = {
      title: '',
      pageNum:this.pageNum,
      pageSize:this.pageSize
    }
    this.service.getAllNotices(params).then(res=>{
      console.log(res)
    })
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

  validatorStr(url) {

  }
}

