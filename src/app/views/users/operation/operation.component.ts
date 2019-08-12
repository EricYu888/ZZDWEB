import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppAlertService } from '../../../components';
import { UtilService } from '../../../shared/';
import { UsersService } from './../../../shared/services/users.service';
import { AppValidatorInputComponent, AppValidatorSelectComponent } from '../../../components/app-validator';
import { AppLoadingService } from '../../../components/app-loading';
import { AlertConfig } from 'ngx-bootstrap/alert';

@Component({
  templateUrl: 'operation.component.html',
  providers: [UsersService]
})
export class UserOperationComponent implements OnInit {
  constructor() {

  }
  ngOnInit() {

  }
}
