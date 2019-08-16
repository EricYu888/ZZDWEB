import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppAlertService } from '../../../components';
import { UtilService } from '../../../shared/';
import { PictureService } from './../../../shared/services/picture.service';
import { AppValidatorInputComponent, AppValidatorSelectComponent } from '../../../components/app-validator';
import { AppLoadingService } from '../../../components/app-loading';
import { AlertConfig } from 'ngx-bootstrap/alert';



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
    displayIndex: 0
  };
  alertsDismiss: any = [];
  facefile;
  faceFileUrl;
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
      }  else {
        this.add = false;
        this.modify = false;
        this.detailView = true;
      }
    });


  }
  ngOnInit() {

  }

  savePic() {

  }

  filechange(e) {
    let fileList: FileList = e.target.files;
    console.log("fileList:", fileList);
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let fileSize: number = fileList[0].size;
      if (fileSize <= (1024 * 1024 * 10)) {
        console.log(file)
        this.facefile = file;
        this.uploadFaceFileImage();
      } else {
        this.facefile = null;
        this.addErrorMsg('上传文件不能大于20M。');
      }
    }
  }
  uploadFaceFileImage() {
    // let faceFileUrl = "";
    if (this.facefile) {
      this.appLoadingService.showLoading();
      let imageFormData: FormData = new FormData();
      imageFormData.append("uploadfile", this.facefile);
      this.service.uploadPic(imageFormData).then((res) => {
        this.appLoadingService.hideLoading();
        console.log("RES:", res);
        if (res.code == 'SUCCESS') {
          this.appAlertService.addAlert({ type: 'info', msg: "图片上传成功" });
          console.log("object:", res.object);
          this.faceFileUrl = res.object;
          this.picture.imgUrl = res.object;
          console.log("FaceImageURL:", this.picture.imgUrl);
        } else if (res.code == 'EXPIRE') {
          this.router.navigate(['/logout'], { replaceUrl: true });
        } else {
          this.appLoadingService.hideLoading();
          this.addErrorMsg(res.msg);
          return;
        }
      });
    } else {
      this.faceFileUrl = '';
      this.picture.imgUrl = '';
      // this.saveNewObject(state, faceFileUrl);
    }
  }

  clolsePic() {

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
