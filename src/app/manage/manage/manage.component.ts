import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  
  gridApi;
  gridColumnApi;
  theme = "ag-theme-balham";
  rowData = [];
  columnDefs = [];
  defaultColDef = {};
  
  ngOnInit() {

  }

  constructor(public _router: Router, private _cs: CommonService) {
    let this_ = this; 
      this.defaultColDef = {
        resizable: true, //컬럼 사이즈 조절 가능 여부 
        lockPosition: true //컬럼 드래그로 이동 방지 
      }; 
      this.columnDefs = [
        { 
          headerName: '번호',
          field: 'column_1', 
            width: 30,            
            tooltipField: 'column_1', 
            cellStyle: { color: 'red', textAlign: "right", backgroundColor: "white" } 
          },
        { 
          headerName: '유저이름',
          field: 'column_2', 
            width: 80,             
            tooltipField: 'column_2', 
            cellStyle: { color: 'red', textAlign: "right", backgroundColor: "white" } 
          },
        { 
          headerName: '유저아이디',
          field: 'column_3', 
            width: 100,            
            tooltipField: 'column_3', 
            cellStyle: { color: 'red', textAlign: "right", backgroundColor: "white" } 
          },
        { 
          headerName: '유저닉네임',
          field: 'column_4', 
            width: 100,             
            tooltipField: 'column_4', 
            cellStyle: { color: 'red', textAlign: "right", backgroundColor: "white" } 
          },
        { 
          headerName: '유저이메일',
          field: 'column_5', 
            width: 200,            
            tooltipField: 'column_5', 
            cellStyle: { color: 'red', textAlign: "right", backgroundColor: "white" } 
          },
        { 
          headerName: '유저전화번호',
          field: 'column_6', 
            width: 100,             
            tooltipField: 'column_6', 
            cellStyle: { color: 'red', textAlign: "right", backgroundColor: "white" } 
          },
        { 
          headerName: '생성날짜',
          field: 'column_7', 
            width: 60,             
            tooltipField: 'column_7', 
            cellStyle: { color: 'red', textAlign: "right", backgroundColor: "white" } 
          },
        { 
          headerName: '생성시간',
          field: 'column_8', 
            width: 60,
            tooltipField: 'column_8', 
            cellStyle: { color: 'red', textAlign: "right", backgroundColor: "white" } 
          },
        { 
          headerName: '수정날짜',
          field: 'column_9', 
            width: 60,
            tooltipField: 'column_9', 
            cellStyle: { color: 'red', textAlign: "right", backgroundColor: "white" } 
          },
        { 
          headerName: '수정시간',
          field: 'column_10', 
            width: 60,
            tooltipField: 'column_10', 
            cellStyle: { color: 'red', textAlign: "right", backgroundColor: "white" } 
          },
        /* { 
          headerName: '컬럼2', 
            field: 'column_2', 
            width: 120, 
            suppressSizeToFit: true, 
            cellRenderer: function(params) {
              return '<img src="assets/images/' + this_.getColumnTypeValue(params.value) + '.png" height="20px" width="20px"/> ';
            }, //cell value를 다루고 싶을 때 
            tooltipValueGetter: function(params) {
              return params.node.data.column_1 + " / " + (params.value).toString(); 
            } //tooltip 
        } */
      ];
      
      /* this._cs.get('/coi').subscribe((data) => { 
        this.rowData = data; 
      }); data의 type은 list, element는 dict여야 합니다. ex) data = [{"column_1": "row_1", "column_2": 1, ...}, {"column_1": "row_2", "column_2": 2, ...}, ...] }*/
  }
  
  onGridReady(params) { 
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi; 
  } 
      
  fitColumnsSize(params) { 
    params.api.sizeColumnsToFit(); 
  } //컬럼의 데이터에 맞춰서 사이즈 조절 
}
