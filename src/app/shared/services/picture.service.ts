import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { normalizeGenFileSuffix } from '@angular/compiler/src/aot/util';


@Injectable()

export class PictureService {
  constructor(public http: HttpService) { }

  public GetAll(params): Promise<any> {
    return this.http.post('cpicture/GetPictrues', params);
  }
  public uploadPic(params): Promise<any> {
    return this.http.post("cpicture/UploadImg", params);
  }

  public GetDetial(params): Promise<any> {
    return this.http.post("cpicture/GetPicDetail", params);
  }

  public upload(stream, doprocess?: (process: number, response: any) => void) {
    this.http.uploadFile('cpicture/UploadImg', stream, doprocess);
  }
  public DeletePic(params): Promise<any> {
    return this.http.post('cpicture/Delete', params);
  }
  public Add(params): Promise<any> {
    return this.http.post('cpicture/Add', params);
  }
  public Update(params): Promise<any> {
    return this.http.post('cpicture/Update', params);
  }
}
