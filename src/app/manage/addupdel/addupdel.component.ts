import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-addupdel',
  templateUrl: './addupdel.component.html',
  styleUrls: ['./addupdel.component.css']
})
export class AddupdelComponent implements OnInit {
  paramValue: string;
  paramString: string;

  constructor(private _router : Router, private route: ActivatedRoute, private _cs: CommonService) { 
    this.paramValue = this.route.snapshot.params['param'];
    alert(this.paramValue);

    switch (this.paramValue) {
      case 'add':
        this.paramString = '추가';
        break;
      case 'up':
        this.paramString = '수정';
        break;
      case 'del':
        this.paramString = '삭제';
        break;
      default:
        break;
    }
  }
    
  ngOnInit() {
  }

  

}
