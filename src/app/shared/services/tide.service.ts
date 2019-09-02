import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { Time } from '@angular/common';


@Injectable()

export class TidService {
  constructor(public service: HttpService) {

  }

  public importTideInfo(file_base64:string): Promise<any> {
    let params = {
      "file_Base64": file_base64,
    };
    return this.service.post("tide/ImportTides",params);
  }
  public exportTideInfo(): Promise<any> {
    return this.service.post("tide/ExportTides",null);
  }
  
  public getTides(from:Date, to:Date, companyId:number,pageSize:number, pageIndex:number): Promise<any> {
    let params = {
      "publicDateFrom": from,
      "publicDateTo": to,
      "companyId":companyId,
      "pageNumber": pageIndex,
      "pageSize": pageSize
    };
    console.log(from,to,pageSize,pageIndex);
    return this.service.post("tide/GetTides",params);
  }
}
