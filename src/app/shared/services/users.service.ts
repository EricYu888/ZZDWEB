import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';


@Injectable()

export class UsersService {
  constructor(public service: HttpService) {

  }

  public getAllUsers(params): Promise<any> {
    return;
  }
  public getUserDetail(params): Promise<any> {
    return;
  }
  public UpdataUser(params): Promise<any> {
    return;
  }
  public AddUser(params): Promise<any> {
    return;
  }
}
