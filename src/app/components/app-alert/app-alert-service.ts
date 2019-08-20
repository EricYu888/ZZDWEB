import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppAlertService {
    // alertEventer: EventEmitter<any> = new EventEmitter();

    private Source=new Subject<any>();
    Status$=this.Source.asObservable();


    addAlert(message: { type: "success"|"info"|"danger"; msg: string; }) {
        console.log(message)
        this.Source.next(message);
    }
}