import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-result-dk',
  templateUrl: './result-dk.component.html',
  styleUrls: ['./result-dk.component.css']
})
export class ResultDkComponent implements OnInit {

  @Input() rel:any;
  @Input() test:string;
  @Output() sendTotal = new EventEmitter<boolean>();

  constructor(private route : ActivatedRoute, private _cs : CommonService) { }

  ngOnInit() {
    console.log(this.rel);
  }

  goBack() {
    this.sendTotal.emit(true);
  }

}
