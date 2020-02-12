import { Injectable } from '@angular/core';

declare var kakao: any;

@Injectable({
  providedIn: 'root'
})
export class KakaoMapService {

  map;

  constructor() { }

  makeMap(x, y) {
    var container = document.getElementById('kakao-map');
    var options = {
      center: new kakao.maps.LatLng(y, x),
      level: 3
    };
    this.map = new kakao.maps.Map(container, options);

    var markerPosition = new kakao.maps.LatLng(y, x);
    var marker = new kakao.maps.Marker({
      position: this.map.getCenter()
    });
    marker.setMap(this.map);

    setTimeout(() => {
      this.map.relayout();
      this.map.setCenter(markerPosition);
    }, 500);
  }

  mapRelayout() {
    console.log(this.map);
    this.map.relayout();
  }
}
