import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Input() rel:any;
  @Input() test:string;
  @Output() sendTotal = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    console.log(this.rel);
  }

  goBack() {
    this.sendTotal.emit(true);
  }

}
