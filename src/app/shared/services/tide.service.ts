import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';


@Injectable()

export class TidService {
  constructor(public service: HttpService) {

  }

  public importTideInfo(params): Promise<any> {
    return;
  }
  public exportTideInfo(params): Promise<any> {
    return;
  }
  public getTideInfo(params): Promise<any> {
    return;
  }
}
