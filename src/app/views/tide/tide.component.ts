import { Component, OnInit } from '@angular/core';
import { TidService } from '../../shared/services/tide.service';

@Component({
  selector: 'app-tide',
  templateUrl: './tide.component.html',
  styleUrls: ['./tide.component.scss'],
  providers: [TidService]
})
export class TideComponent implements OnInit {
  loading: boolean = false;
  tideList = [];
  totalItems: number;
  pageNum: number;
  pageSize: number = 20;
  fromDate:Date; 
  toDate:Date; 
  constructor(
    public service: TidService) { }

  ngOnInit() {

  }

  loadTideInfo() {
    const params = {
      from_date: this.fromDate,
      to_date:this.toDate,
    };
  this.loading = true;
    this.service.getTideInfo(params).then(res => {
      if (res.code === 'SUCCESS') {
        this.totalItems = res.data;
        this.loading = false;
      }
    })
  }

  import() {

  }

  pageChanged($event) {
    this.pageNum = $event.page;
  }
}
