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
  @ViewChild('title') title;
  @ViewChild('displayIndex') displayIndex;


  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public util: UtilService,
    public appLoadingService: AppLoadingService,
    public service: PictureService,
    public appAlertService: AppAlertService) {

  }
  ngOnInit() {

  }

  savePic() {

  }
  clolsePic() {

  }

  validatorStr(str) {
    return !this.util.isEmptyStr(str);
  }

  validatorNum(str) {
    return this.util.validatorNum(str);
  }
}
