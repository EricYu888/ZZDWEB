import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppAlertService } from '../../../components';
import { UtilService } from '../../../shared/';
import { PictureService } from './../../../shared/services/picture.service';
import { AppValidatorInputComponent, AppValidatorSelectComponent } from '../../../components/app-validator';
import { AppLoadingService } from '../../../components/app-loading';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { PIC_FILE_PATH } from './../../../shared/constants';


@Component({
  templateUrl: 'operation.component.html',
  styleUrls: ['./operation.component.scss'],
  providers: [PictureService]
})


export class PictureOperationComponent implements OnInit {
  id: any;
  add = false;
  modify = false;
  detailView = false;
  hasSubmit: boolean;
  picture = {
    id: '',
    title: '',
    imgUrl: '',
    picureUrl: '',
    displayIndex: ''
  };
  alertsDismiss: any = [];
  facefile;
  faceFileUrl;
  file_base64 = "";
  isSubmit = false;
  passValidate = false;
  loading: any;
  @ViewChild('title') title;
  @ViewChild('displayIndex') displayIndex;
  @ViewChild('newsFaceImage') newsFaceImage;

  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public util: UtilService,
    public appLoadingService: AppLoadingService,
    public service: PictureService,
    public appAlertService: AppAlertService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.id;
      const operate = params.operate;
      if (operate === 'add') {
        this.add = true;
        this.modify = false;
      } else if (operate === 'modify') {
        this.picture['id'] = this.id;
        this.add = false;
        this.modify = true;
      } else {
        this.add = false;
        this.modify = false;
        this.detailView = true;
      }
    });


  }
  ngOnInit() {


    if (this.id) {
      this.getDetail();
    }
  }

  savePic() {
    this.hasSubmit = true;
    this.invalidate();
    if (this.picture.imgUrl.length > 0) {
      this.isSubmit = true;
    }
    if (this.title.test && this.isSubmit) {
      let callback = (res) => {
        this.appLoadingService.showLoading();
        if (res.result.isSuccess === true) {
          this.appLoadingService.hideLoading();
          let resultMsg = '';
          if (this.add) {
            resultMsg = 'addSuccess';
            this.appAlertService.addAlert({ type: 'info', msg: '添加成功' });
          } else if (this.modify) {
            this.appAlertService.addAlert({ type: 'info', msg: '修改成功' });
            resultMsg = 'modifySuccess';
          }
          this.router.navigate(['/picture'], { replaceUrl: true, queryParams: { result: resultMsg } });
        }
        else {
          this.appAlertService.addAlert({ type: 'info', msg: res.result.ErrorMessage });
        }
      }

      if (this.add) {
        let param = {
          title: this.picture.title,
          imgUrl: this.picture.imgUrl,
          companyId: sessionStorage.getItem('companyId'),
          displayIndex: this.picture.displayIndex
        }
        this.service.Add(param).then(callback);
      } else if (this.modify) {
        let param = {
          id: this.id,
          title: this.picture.title,
          imgUrl: this.picture.imgUrl,
          displayIndex: this.picture.displayIndex
        }
        this.service.Update(param).then(callback);
      }
    }
    else {

    }
  }

  invalidate() {
    if (this.picture.imgUrl === null || this.picture.imgUrl === "") {
      this.passValidate = true;
    }
    else {
      this.passValidate = false;
    }
  }

  getDetail() {
    this.loading = true;
    const param = {
      id: this.id
    }
    this.service.GetDetial(param).then(res => {
      this.loading = false;
      if (res.result.isSuccess === true) {
        this.picture.title = res.result.data.title;
        this.picture.imgUrl = res.result.data.imgUrl;
        this.picture.picureUrl = res.result.data.imgUrl;
        this.picture.displayIndex = res.result.data.displayIndex;
      }
    })
  }

  filechange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let fileSize: number = fileList[0].size;
      if (fileSize <= (1024 * 1024 * 10)) {
        this.facefile = file;
        this.uploadFaceFileImage(this.facefile);
      } else {
        this.facefile = null;
        this.addErrorMsg('上传文件不能大于20M。');
      }
    }
  }
  uploadFaceFileImage(facefile) {
    let that = this;
    let reader = new FileReader();
    reader.readAsDataURL(facefile);
    reader.onloadend = function () {
      let tmp = reader.result.toString();
      tmp = tmp.substring(tmp.indexOf(",") + 1);
      that.file_base64 = tmp;
      that.service.uploadPic({
        "file_Base64": that.file_base64
      }).then(res => {
        if (res.result.isSuccess) {
          that.passValidate = false;
          that.picture.imgUrl = PIC_FILE_PATH + res.result.data;
          that.picture.picureUrl = PIC_FILE_PATH + res.result.data;
        }
      })
    };
  }

  close() {
    this.router.navigate(['/picture'], { replaceUrl: true});
  }
  validatorStr(str) {
    return !this.util.isEmptyStr(str);
  }

  validatorNum(str) {
    return this.util.validatorNum(str);
  }

  addErrorMsg(msg) {
    this.alertsDismiss.push({
      type: 'danger',
      msg: `${msg}`,
      timeout: 5000
    });
  }
}
