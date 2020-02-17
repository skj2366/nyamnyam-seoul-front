import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {
    let this_ = this; 
      this.defaultColDef = {
        resizable: true, //컬럼 사이즈 조절 가능 여부 
        lockPosition: true //컬럼 드래그로 이동 방지 
      }; 
      this.columnDefs = [
        { 
            headerName: '컬럼1',
            field: 'column_1', 
              width: 80, 
              minWidth: 60, 
              maxWidth: 100, 
              tooltipField: 'column_1', 
              cellStyle: { color: 'red', textAlign: "right", backgroundColor: "white" } 
          },
          { 
            headerName: '컬럼2', 
              field: 'column_2', 
              width: 120, 
              suppressSizeToFit: true, 
              cellRenderer: function(params) {
                /* return '<img src="assets/images/' + this_.getColumnTypeValue(params.value) + '.png" height="20px" width="20px"/> ';*/
              }, //cell value를 다루고 싶을 때 
              tooltipValueGetter: function(params) {
                return params.node.data.column_1 + " / " + (params.value).toString(); 
              } //tooltip 
          }
      ];
      
      /* this.http.get('/getRowData').subscribe((data) => { 
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
