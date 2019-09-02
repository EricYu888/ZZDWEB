import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NoticeService } from './../../shared/services/notice.service';
import { AppModalService } from '../../components';
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
  currentNoticeItem

  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public service: NoticeService,
    public appModelService: AppModalService
  ) {
    if (!this.pageNum) {
      confirm
      this.pageNum = 1;
    }
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    const params = {
      title: this.title,
      companyId: sessionStorage.getItem('companyId'),
      pageNumber: this.pageNum,
      pageSize: this.pageSize
    }
    this.service.getAllNotices(params).then(res => {
      this.loading = false;
      if (res.result.isSuccess) {
        this.noticeList = res.result.data;
        this.totalItems = res.result.total;
      }
    })
  }
  addNotice() {
    this.router.navigate(['/notice/operation'], { queryParams: { operate: 'add' } });
  }
  jumpToModify(item) {
    this.router.navigate(['/notice/operation'], { queryParams: { operate: 'modify', id: item.id } })
  }
  deleteNotice(item) {
    this.currentNoticeItem = item.id;
    let okCallback = () => {
      let noticeId = this.currentNoticeItem;
      this.currentNoticeItem = null;
      this.service.DeleteNotice({ 'id': noticeId }).then(res => {
        if (res.result.isSuccess) {
          this.addMsg('success', '删除成功！');
          this.getAll();
        }
        else {
          this.addMsg('danger', res.result.errorMessage);
        }
      })
    }
    let cancelCallback = () => {
      this.currentNoticeItem = null;
    }

    this.appModelService.showModal({
      type: 'confirm',
      modalContent: '确认要删除该通知么？',
      okcallback: okCallback,
      cancelcallback: cancelCallback
    })
  }
  pageChanged(event) {
    this.pageNum = event.page;
    this.getAll();
  }

  validatorStr(url) {

  }

  private addMsg(type, msg) {
    this.alertsDismiss = [];
    this.alertsDismiss.push({
      type: type,
      msg: `${msg}`,
      timeout: 5000
    });
  }

}