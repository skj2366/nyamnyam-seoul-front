import { Component, OnInit } from '@angular/core';
import { ZoneSubwayService } from '../zone-subway.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private _zonsub : ZoneSubwayService, ) { }

  ngOnInit() {
    
  }

  getZones() {
    this._zonsub.getZone();
  }

  
}
