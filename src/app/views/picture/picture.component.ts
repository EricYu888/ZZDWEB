import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PictureService } from './../../shared/services//picture.service';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss'],
  providers: [PictureService]
})
export class PictureComponent implements OnInit {


  title = '';
  pictureList = [];
  loading = true;
  alertsDismiss: any = [];
  totalItems: number;
  pageNum: number;
  pageSize = 10;

  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public service: PictureService) {


    }

  ngOnInit() {
  }
  getAll() {

  }

  addPic() {
    this.router.navigate(['/picture/operation'], { queryParams: { operate: 'add' } });
  }
  jumpToModify(itme) {

  }
  deletePic(item) {

  }

}
