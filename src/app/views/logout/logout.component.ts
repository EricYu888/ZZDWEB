import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { LogoutService } from '../../shared/services/logout.service';
import { UtilService } from '../../shared/';
import { AppLoadingService } from '../../components/app-loading';

@Component({
    templateUrl: 'logout.component.html',
})
export class LogoutComponent implements OnInit {

    constructor(public router: Router, public util: UtilService, public logoutDao: LogoutService, public appLoadingService: AppLoadingService) {
        this.util.removeSessionStorage('userflag');
    }

    ngOnInit() {
        this.appLoadingService.showLoading();
        sessionStorage.removeItem('username');
        this.appLoadingService.hideLoading();
        this.router.navigate(['/login'], { queryParams: { result: 'SUCCESS' }, replaceUrl: true });
    }
}
