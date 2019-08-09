import { Component, OnInit } from '@angular/core';
import { RelationService } from './../../shared/services/relation.service';


@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrls: ['./relation.component.scss'],
  providers: [RelationService]
})
export class RelationComponent implements OnInit {
  customer = '-1';
  customerList = [];
  siteList = [];
  relationList = [];
  allCheck = false;
  loading = false;
  alertsDismiss: any = [];
  constructor(public service: RelationService) {

  }

  ngOnInit() {
    // this.bindSiteInfo();
    this.bindCustomerInfo();
  }
  bindSiteInfo() {
    this.siteList = [];
    this.loading = true
    this.service.getSiteList({ 'customerId': 1 }).then(res => {
      this.loading = false;
      if (res.result.isSuccess) {
        res.result.data.forEach(element => {
          this.siteList.push({
            id: element.id,
            areaCode: element.areaCode,
            areaName: element.areaName,
            stType: element.stType,
            stlc: element.stlc
          })
        });
        this.getAll();
      }
    })
  }
  bindCustomerInfo() {
    this.customerList = [];
    this.service.getCustomerList({ 'customerId': 1 }).then(res => {
      if (res.result.isSuccess) {
        res.result.data.forEach(element => {
          this.customerList.push({
            key: element.id,
            value: element.customerName
          })
        });

        this.customer = this.customerList[0].key;
        this.bindSiteInfo();
      }
    })
  }
  // bindCustomerRelation() {
  // }
  getAll() {
    if (this.customer === '-1') {
      this.addMsg('danger', '请选择客户!');
    }
    for (let i = 0, len = this.siteList.length; i < len; i++) {
      this.siteList[i].checked = false;
    }
    this.service.getRelationByCustomer({ 'customer_id': this.customer }).then(res => {
      if (res.result.isSuccess) {
        this.siteList.forEach(item => {
          res.result.data.forEach(relation => {
            if (item.id === relation.site_id) {
              item.checked = true;
            }
          });
        })
        if (this.siteList.length === res.result.data.length) {
          this.allCheck = true;
        }
      }
    })
  }
  checkChange(item) {
    if (!item) {
      this.siteList.forEach((res, index) => {
        res.checked = this.allCheck;
      });
    } else {
      for (let i = 0, len = this.siteList.length; i < len; i++) {
        if (!this.siteList[i].checked) {
          this.allCheck = false;
          return;
        }
      }
      this.allCheck = true;
    }
  }

  setRelation() {
    this.relationList = [];
    this.siteList.forEach(ele => {
      if (ele.checked) {
        this.relationList.push(ele.id)
      }
    })
    if (this.relationList.length === 0) {
      this.addMsg('danger', '请为当前客户至少选择一个站点！')
      return;
    }


    this.service.updataRelation({ 'customer_id': this.customer, 'siteIdArr': this.relationList }).then(
      res => {
        console.log(res)
        if (res.result.isSuccess) {
          this.addMsg('success', '客户与站点关系设置成功！')
        }
      }
    )
  }
  // convertType(type) {
  //   let typeName = '';
  //   if (type) {
  //     switch (type) {
  //       case '0001':
  //         typeName = '1';
  //         break;
  //       case '0002':
  //         typeName = '2';
  //         break;
  //       case '0004':
  //         typeName = '3';
  //         break;
  //       case '0019':
  //         typeName = '4';
  //         break;
  //       case '003b':
  //         typeName = '5';
  //         break;
  //     }
  //   }
  //   return typeName;
  // }
  private addMsg(type, msg) {
    this.alertsDismiss = [];
    this.alertsDismiss.push({
      type: type,
      msg: `${msg}`,
      timeout: 5000
    });
  }
}
