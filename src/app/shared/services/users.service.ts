import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';


@Injectable()

export class UsersService {
  constructor(public service: HttpService) {

  }

 

  public getAllUsers(params): Promise<any> {
    return this.service.post('account/GetAll',params);
  }
  public getUserDetail(params): Promise<any> {
    return this.service.post('account/GetDetail',params);;
  }
  public UpdataUser(params): Promise<any> {
    return this.service.post('account/Update',params);
  }
  public AddUser(params): Promise<any> {
    return this.service.post('account/Add',params);
  }
}
