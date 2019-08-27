import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PictureService } from './../../shared/services//picture.service';
import { UtilService } from '../../shared/';
import { PIC_FILE_PATH } from '../../shared/constants';
import { AppModalService } from '../../components';
@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss'],
  providers: [PictureService]
})
export class PictureComponent implements OnInit {


  title = '';
  pictureList = [];
  loading = true;
  alertsDismiss: any = [];
  totalItems: number;
  pageNum: number;
  pageSize = 10;
  currentPicItem;
  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public service: PictureService,
    public util: UtilService,
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
      pageNumber: this.pageNum,
      pageSize: this.pageSize
    }
    this.service.GetAll(params).then(res => {
      this.loading = false;

      if (res.result.isSuccess) {
        this.pictureList = res.result.data;
        this.pictureList.forEach(res => {
          res.imgUrl = PIC_FILE_PATH + res.imgUrl
        })
        this.totalItems = res.result.total;
      }
    })
  }

  addPic() {
    this.router.navigate(['/picture/operation'], { queryParams: { operate: 'add' } });
  }
  jumpToModify(item) {
    this.router.navigate(['/picture/operation'], { queryParams: { operate: 'modify', id: item.id } });
  }
  deletePic(item) {
  

    this.currentPicItem = item.id;
    let okCallback = () => {
      let picId = this.currentPicItem;
      this.currentPicItem = null;
      this.service.DeletePic({ 'id': picId }).then(res => {
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
      this.currentPicItem = null;
    }

    this.appModelService.showModal({
      type: 'confirm',
      modalContent: '确认要删除该通知么？',
      okcallback: okCallback,
      cancelcallback: cancelCallback
    })
  }
  validatorStr(str) {
    return !this.util.isEmptyStr(str);
  }

  pageChanged(event) {
    console.log(event.page)
    this.pageNum = event.page;
    this.getAll();
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
