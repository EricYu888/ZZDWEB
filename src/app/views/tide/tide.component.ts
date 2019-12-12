import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TidService } from '../../shared/services/tide.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppAlertService } from '../../components';
import { UtilService } from '../../shared/';
import { AppLoadingService } from '../../components/app-loading';
import { EXPORT_FILE_PATH } from '../../shared/constants';

@Component({
  selector: 'app-tide',
  templateUrl: './tide.component.html',
  styleUrls: ['./tide.component.scss'],
  providers: [TidService]
})
export class TideComponent implements OnInit {
  loading: boolean = false;
  tideList = [];
  pageSize: number = 3;
  fromDate: Date;
  toDate: Date;
  file_base64: string;
  alertsDismiss: any = [];
  @Input() pageNum: number = 1;
  @Input() totalItems: number = 20;
  @Output() pageChanges: EventEmitter<Page> = new EventEmitter();
  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public util: UtilService,
    public appLoadingService: AppLoadingService,
    public service: TidService,
    public appAlertService: AppAlertService) { }

  ngOnInit() {
    this.pageNum = 1;
    this.pageSize = 20;

    this.loadTideInfo()
  }

  loadTideInfo(event = null) {
    this.tideList=[]
    this.loading = true;
    this.service.getTides(this.fromDate, this.toDate, parseInt(sessionStorage.getItem('companyId')), this.pageSize, this.pageNum).then(res => {
      this.loading = false;
      if (res.result.isSuccess) {
        this.tideList = res.result.data;
        this.calculatePaging(res.result.total, event);
      }
    })
  }
  calculatePaging(total, event = null) {
    this.totalItems = total;
    this.pageChanges.emit(event);
  }

  import() {
    this.service.importTideInfo(this.file_base64).then(res => {
      this.loading = false;
      if (res.result.isSuccess) {
        this.loadTideInfo();
        this.appAlertService.addAlert({ type: 'info', msg: '导入成功' });
      }
    },
      error => {
        this.appAlertService.addAlert({ type: 'danger', msg: '导入文件无法解析，请仔细填写并保证输入格式与到处文件一致。' });
      })
  }
  export() {
    this.service.exportTideInfo().then(res => {
      this.loading = false;
      if (res.result.isSuccess) {
        let filename = res.result.data;
        let fullFilePath = EXPORT_FILE_PATH + filename;
        this.appAlertService.addAlert({ type: 'info', msg: '导出成功' });
        window.open(fullFilePath);
      }
    })
  }
  selectedFileOnChanged(event) {
    let that = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      let tmp = reader.result.toString();
      tmp = tmp.substring(tmp.indexOf(",") + 1);
      that.file_base64 = tmp;
      console.log(that.file_base64);
    };

  }
  pageChanged(event) {
    this.pageNum = event.page;
    this.loadTideInfo(event);
  }
}

export class Page {
  constructor(
    public itemsPerPage: number,
    public page: number
  ) {
    this.itemsPerPage = 3;
    this.page = 1;
  }
}