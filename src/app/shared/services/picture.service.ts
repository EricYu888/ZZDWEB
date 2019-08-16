import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { normalizeGenFileSuffix } from '@angular/compiler/src/aot/util';


@Injectable()

export class PictureService {
  constructor(public http: HttpService) { }

  public GetAll(params): Promise<any> {
    return this.http.post('', '');
  }
  public uploadPic(params): Promise<any> {
    return;
  }
  public DeletePic(params): Promise<any> {
    return;
  }
}
