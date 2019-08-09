import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';


@Injectable()

export class RelationService {
    constructor(public http: HttpService) { }

    public getSiteList(params): Promise<any> {
        return this.http.post('stnInfoB/GetStnInfoB', params);
    }
    public getCustomerList(params): Promise<any> {
        return this.http.post('customer/GetCustomer', params);
    }
    public getRelationByCustomer(params): Promise<any> {
        return this.http.post('relation/GetRelations', params)
    }
    public updataRelation(params): Promise<any> {
        return this.http.post('relation/AddRelations', params);
    }
}
