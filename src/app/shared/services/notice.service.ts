import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';


@Injectable()

export class NoticeService {
  constructor(public service: HttpService) {

  }

  public getAllNotices(params): Promise<any> {
    return;
  }
  public getNoticeDetail(params): Promise<any> {
    return;
  }
  public UpdataNotice(params): Promise<any> {
    return;
  }
  public AddNotice(params): Promise<any> {
    return;
  }
}
