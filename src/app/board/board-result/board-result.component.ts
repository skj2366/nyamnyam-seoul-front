import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-board-result',
  templateUrl: './board-result.component.html',
  styleUrls: ['./board-result.component.css']
})
export class BoardResultComponent implements OnInit {

  constructor(private _cs : CommonService) { }

  ngOnInit() {
  }

  getReviewDetail(){
    
  }
   
}
