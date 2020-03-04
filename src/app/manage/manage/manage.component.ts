import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { CustomerInfo } from 'src/app/vo/customer-info';
import { RestaurantList } from 'src/app/vo/restaurant-list';
import { CommentList } from 'src/app/vo/comment-list';
import { GridOptions, Grid } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GridColumnStyleBuilder } from '@angular/flex-layout/grid/typings/column/column';

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

  gridApi;
  gridColumnApi;
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

  ngOnInit() {

  }

  constructor(public _router: Router, private _cs: CommonService) {
    let this_ = this;
    this.defaultColDef = {
      resizable: true, //컬럼 사이즈 조절 가능 여부 
      lockPosition: true, //컬럼 드래그로 이동 방지
      rowSelection: 'multiple',
      animateRows: true
    };

    this_.columnDefsUser = [
      { headerName: '번호', field: 'cuiNum', width: 50, cellStyle: { color: '#4C4C4C', textAlign: "center", backgroundColor: "#FFA7A7" }, checkboxSelection: true, headerCheckboxSelection: true },
      { headerName: '유저이름', field: 'cuiName', width: 80, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" }, },
      { headerName: '유저아이디', field: 'cuiId', width: 100, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '유저닉네임', field: 'cuiNickname', width: 100, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" }, editable: true },
      { headerName: '유저이메일', field: 'cuiEmail', width: 200, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '유저전화번호', field: 'cuiPhone', width: 100, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
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
      { headerName: '번호', field: 'relNum', width: 30, cellStyle: { color: '#4C4C4C', textAlign: "center", backgroundColor: "#FFA7A7" }, checkboxSelection: true, headerCheckboxSelection: true },
      { headerName: '식당이름', field: 'relName', width: 80, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '식당주소', field: 'relSubAddress', width: 120, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '식당전화번호', field: 'relCall', width: 80, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '생성날짜', field: 'relCredat', width: 60, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '생성시간', field: 'relCretim', width: 60, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '수정날짜', field: 'relModdat', width: 60, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } },
      { headerName: '수정시간', field: 'relModtim', width: 60, cellStyle: { color: '#5D5D5D', textAlign: "center", backgroundColor: "white" } }
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

    this._cs.get('/col').subscribe((res) => {
      this.rowDataComment = <CommentList[]>res;
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log(this.gridApi);
  }

  fitColumnsSize(params) {
    params.api.sizeColumnsToFit();
  } //컬럼의 데이터에 맞춰서 사이즈 조절

  goAddUpDelete(param:string) {
    if(param) {
      this._router.navigateByUrl(`/addUpDel/${param}`);
    }
  }
}
