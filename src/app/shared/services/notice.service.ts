import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';


@Injectable()

export class NoticeService {
  constructor(public service: HttpService) {

  }

  public getAllNotices(params): Promise<any> {
    return this.service.post('notice/GetAll', params);
  }
  public getNoticeDetail(params): Promise<any> {
    return this.service.post('notice/GetNoticeDetail', params);
  }
  public UpdataNotice(params): Promise<any> {
    return this.service.post('notice/UpdateNotice', params);
  }
  public AddNotice(params): Promise<any> {
    return this.service.post('notice/AddNotice', params);
  }

  public DeleteNotice(params): Promise<any> {
    return this.service.post('notice/NoticeDelete', params);

  }
}
