import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZoneInfo } from '../vo/zone-info';
import * as $ from 'jquery';
import { ZoneSubwayService } from '../search/zone-subway.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
   
  constructor(private _router:Router, private _zonsub : ZoneSubwayService) { }

  ngOnInit() {
    
  }
 
  getZones() {
    this._zonsub.getZone();
  }
  
}
