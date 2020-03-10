import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { CustomerInfo } from 'src/app/vo/customer-info';
import { RestaurantList } from 'src/app/vo/restaurant-list';
import { CommentList } from 'src/app/vo/comment-list';
import { GridOptions, Grid, Module } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  imports: [
    BrowserModule,
    FormsModule
  ]

  relName : string;
  relCategory : string;
  relStringCategory : string;
  relEtcTime : string;
  relSubAddress : string;
  relCall : string;
  
  zoneList: any;
  subList: any;
  zoneValue: number = 0;
  subValue: number = 0;
  
  private gridApiUser;
  private gridApiRestaurant;
  private gridApiComment;
  private gridColumnApiUser;
  private gridColumnApiRestaurant;
  private gridColumnApiComment;
 
  gridOptions: GridOptions;
  theme = "ag-theme-balham";

  rowDataUser = [];
  rowDataRestaurant = [];
  rowDataComment = [];

  columnDefsUser = [];
  columnDefsRestaurant = [];
  columnDefsComment = [];
  defaultColDef = {};

  cui: CustomerInfo = new CustomerInfo();
  rel: RestaurantList = new RestaurantList();
  col: CommentList = new CommentList();

  newCount = 1;

  ngOnInit() {
    this.getZones();
  }

  constructor(public _router: Router, private _cs: CommonService, private route : ActivatedRoute) {
    let this_ = this;
    this.defaultColDef = {
      resizable: true, //컬럼 사이즈 조절 가능 여부 
      lockPosition: true, //컬럼 드래그로 이동 방지
      rowSelection: 'multiple',
      animateRows: true
    };

    this_.columnDefsUser = [
      { headerName: '번호', field: 'cuiNum', width: 70, cellStyle: { color: '#4C4C4C', textAlign: "center", backgroundColor: "#FFA7A7" }, checkboxSelection: true, headerCheckboxSelection: true },
      { headerName: '유저이름', field: 'cuiName', width: 80, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" }, editable: true },
      { headerName: '유저아이디', field: 'cuiId', width: 80, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" }, editable: true  },
      { headerName: '유저닉네임', field: 'cuiNickname', width: 100, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" }, editable: true },
      { headerName: '유저이메일', field: 'cuiEmail', width: 200, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" }, editable: true  },
      { headerName: '유저전화번호', field: 'cuiPhone', width: 100, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" }, editable: true  },
      { headerName: '생성날짜', field: 'cuiCredat', width: 60, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '생성시간', field: 'cuiCretim', width: 60, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '수정날짜', field: 'cuiModdat', width: 60, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '수정시간', field: 'cuiModtim', width: 60, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      /* { headerName: 'Delete', field: 'delete', width:50,
                              cellRenderer : function(params){return '<i class="icon-trash cell-btn-remove" title="Delete this record" ng-click="deleteRecord(data,'+params.node.id+')">'
         }}
      { 
        headerName: '컬럼2', field: 'column_2', width: 120, suppressSizeToFit: true, 
          cellRenderer: function(params) {
            return '<img src="assets/images/' + this_.getColumnTypeValue(params.value) + '.png" height="20px" width="20px"/> ';
          }, //cell value를 다루고 싶을 때             
      } */
    ];

    this_.columnDefsRestaurant = [
      { headerName: '번호', field: 'relNum', width: 80, cellStyle: { color: '#4C4C4C', textAlign: "center", backgroundColor: "#FFA7A7" }, checkboxSelection: true, headerCheckboxSelection: true },
      { headerName: '식당이름', field: 'relName', width: 180, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '식당주소', field: 'relSubAddress', width: 500, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '식당전화번호', field: 'relCall', width: 150, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '생성날짜', field: 'relCredat', width: 80, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '생성시간', field: 'relCretim', width: 80, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '수정날짜', field: 'relModdat', width: 80, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '수정시간', field: 'relModtim', width: 80, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } }
    ];

    this_.columnDefsComment = [
      { headerName: '번호', field: 'coiNum', width: 30, cellStyle: { color: '#4C4C4C', textAlign: "center", backgroundColor: "#FFA7A7" }, checkboxSelection: true, headerCheckboxSelection: true },
      { headerName: '서브번호', field: 'subNum', width: 30, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '유저번호', field: 'cuiNum', width: 30, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '식당번호', field: 'relNum', width: 30, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '댓글내용', field: 'coiContents', width: 300, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '생성날짜', field: 'relCredat', width: 40, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '생성시간', field: 'relCretim', width: 40, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } }
    ];

    this._cs.get('/cui').subscribe((res) => {
      this.rowDataUser = <CustomerInfo[]>res;
    });  /*data의 type은 list, element는 dict여야 합니다. ex) data = [{"column_1": "row_1", "column_2": 1, ...}, {"column_1": "row_2", "column_2": 2, ...}, ...] }*/

    this._cs.get('/rel').subscribe((res) => {
      this.rowDataRestaurant = <RestaurantList[]>res;
    });

    this._cs.get('/coi').subscribe((res) => {
      this.rowDataComment = <CommentList[]>res;
    });
  }

  getZones() {
    this._cs.get('/zoi').subscribe(
      res => {
        //console.log(res);
        this.zoneList = res;
        //console.log(this.zoneList);
      }, err => {
        console.log(err);
      }
    )
  }

  getSubwayInfo() {
    this.subValue = 0;
    if (this.zoneValue) {
      this._cs.get('/sui/' + this.zoneValue).subscribe(
        res => {
          //console.log(res);
          this.subList = res;
        }
      )
    }
    else {
      this._cs.get('/sui').subscribe(
        res => {
          console.log(res);
          this.subList = res;
        }
      )
    }
  }

  getZoneValue(exp) {
    console.log(exp);
  }

  getSubValue(exp) {
    console.log(exp);
    this.subValue = exp;
  }
  
  onGridReady(params) {
    // this.gridApi = params.api;
    // this.gridColumnApi = params.columnApi;
    // console.log(this.gridApi);
  }

  onGridUserReady(params) {
    this.gridApiUser = params.api;
    this.gridColumnApiUser = params.columnApi;
    //console.log("User호출");
  }

  onGridRestaurantReady(params) {
    this.gridApiRestaurant = params.api;
    this.gridColumnApiRestaurant = params.columnApi;
    //console.log("Restaurant호출");
  }
  
  onGridCommantReady(params) {
    this.gridApiComment = params.api;
    this.gridColumnApiComment = params.columnApi;
    //console.log("Comment호출");
  }

  fitColumnsSize(params) {
    params.api.sizeColumnsToFit();
  } //컬럼의 데이터에 맞춰서 사이즈 조절

  getDate() {
    var date = new Date();
    console.log(date);
    var year = date.getFullYear();
    var mm = (date.getMonth()+1).toString();
    var dd = (date.getDate()).toString();

    if(dd.length<2) {
      dd = "0" + dd;
    } 
    
    if(mm.length<2) {
      mm = "0" + mm;
    } 
    var dateString = year + mm + dd;
    return dateString;
  }

  getTime() {
    var time = new Date();
    var hour = (time.getHours()).toString();
    var min = (time.getMinutes()).toString();
    var sec = (time.getSeconds()).toString();

    if(hour.length<2) {
      hour = "0" + hour;
    }
    if(min.length<2) {
      min = "0" + min;
    }
    if(sec.length<2) {
      sec = "0" + sec;
    }

    var timeString = hour + min + sec;
    return timeString;
  }

  //////////// 유저 삽입, 수정, 삭제/////////////////
  userCreateNewRowData() {
    var newData = {
      cuiName: "Name " + this.newCount,
      cuiId: "Id" + this.newCount,
      cuiNickname: "Nickname" + this.newCount,
      cuiEmail: "abc" + this.newCount + "@abc.com",
      cuiPhone: "01011111111",
      cuiCredat: this.getDate(),
      cuiCretim: this.getTime(),
      cuiModdat: this.getDate(),
      cuiModtim: this.getTime()
    };
    this.newCount++;
    return newData;
  }

  onAddRowUser() {
    var newItem = this.userCreateNewRowData();
    var res = this.gridApiUser.updateRowData({ add: [newItem], addIndex:0});
    this.printResult(res);
  }

  onRemoveSelectedUser() {
    var selectedData = this.gridApiUser.getSelectedRows();
    var res = this.gridApiUser.updateRowData({ remove: selectedData });
    this.printResult(res);
  }

  /*
  updateItemsUser() {
    var itemsToUpdate = [];
    this.gridApiUser.forEachNodeAfterFilterAndSort(function(rowNode, index) {
      if (index >= 5) {
        return;
      }
      var data = rowNode.data;
      data.price = Math.floor(Math.random() * 20000 + 20000);
      itemsToUpdate.push(data);
    });
    var res = this.gridApiUser.updateRowData({ update: itemsToUpdate });
    this.printResult(res);
  }
  */
  
  /*
  updateItemsUser() {
    var updateRows = [];
    myGridUser.gridOpts.api.stopEditing();
    myGridUser.gridOpts.api.forEachNode( function(rowNode, index) {
        if(rowNode.data.edit){
            updateRows.push(rowNode.data);
        }
    });
    $("#updateRows").html(JSON.stringify(updateRows));
  }
  */

  //////////// 식당 삽입, 수정, 삭제/////////////////
  async setRowDetail(params) {
    console.log('row', params.data);
    console.log(params.data['relName']);
    this.relName = params.data['relName'];
    this.relCategory = params.data['relCategory'];
    this.relStringCategory = params.data['relStringCategory'];
    this.relSubAddress = params.data['relSubAddress'];
    this.relCall = params.data['relCall'];
    this.relEtcTime = params.data['relEtcTime'];
    this.zoneValue = params.data['zoneNum'];
    this.subValue = params.data['subwayNum'];
  }

  restaurantCreateNewRowData() {
    var newData = {
      relName: "Restaurant" + this.newCount,
      relSubAddress: "도로명 주소 / 지번주소 : " + this.newCount,
      relCall: "전화번호" + this.newCount,     
      relCredat: this.getDate(),
      relCretim: this.getTime(),
      relModdat: this.getDate(),
      relModtim: this.getTime()
    };
    this.newCount++;
    return newData;
  }

  onAddRowRestaurant() {
    var newItem = this.restaurantCreateNewRowData();
    var res = this.gridApiRestaurant.updateRowData({ add: [newItem], addIndex:0});
    this.printResult(res);
  }

  onRemoveSelectedRestaurant() {
    var selectedData = this.gridApiRestaurant.getSelectedRows();
    var res = this.gridApiRestaurant.updateRowData({ remove: selectedData });
    this.printResult(res);
  }


  //////////// 댓글 삭제/////////////////
  
  onRemoveSelectedComment() {
    var selectedData = this.gridApiComment.getSelectedRows();
    var res = this.gridApiComment.updateRowData({ remove: selectedData });
    this.printResult(res);
  }





  printResult(res) {
    console.log("---------------------------------------");
    if (res.add) {
      res.add.forEach(function(rowNode) {
        console.log("Added Row Node", rowNode.data);
      });
    }
    if (res.remove) {
      res.remove.forEach(function(rowNode) {
        console.log("Removed Row Node", rowNode.data);
      });
    }
    if (res.update) {
      res.update.forEach(function(rowNode) {
        console.log("Updated Row Node", rowNode.data);
      });
    }
  }

}
