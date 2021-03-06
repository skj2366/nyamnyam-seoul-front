import { Injectable } from '@angular/core';
import { RestaurantList } from '../vo/restaurant-list';
import { CommonService } from './common.service';
import { Router } from '@angular/router';

declare var kakao: any;

@Injectable({
  providedIn: 'root'
})
export class KakaoMapService {

  map;

  constructor(private _cs: CommonService, private _router:Router) { }

  // 단일 검색 시 makeMap 사용.
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

  makeMapResult(rel, id) {
    console.log(`${rel.relLatitude}, ${rel.relLongitude}, id : ${id}`);
    var container = document.getElementById('kakao-map');
    var options = {
      center: new kakao.maps.LatLng(rel.relLatitude, rel.relLongitude),
      level: 4
    };
    this.map = new kakao.maps.Map(container, options);

    var markerPosition = new kakao.maps.LatLng(rel.relLatitude, rel.relLongitude);

    var imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    var imageSize = new kakao.maps.Size(24, 35);
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    var marker = new kakao.maps.Marker({
      position: this.map.getCenter(),
      image: markerImage
    });
    marker.setMap(this.map);

    var iwContent = `<div style="padding:5px; width:450px; height:auto; border: 1px solid black; border-radius: 5px;"><img src="${rel.meiImg1Name}" style="width:10%; height:auto;">&nbsp;<b>${rel.relName}</b><br>${rel.relCall}<br>${rel.relSubAddress}<br></div>`;//인포윈도우 내용
    // var iwContent = `<div style="padding:5px;">Hello World!</div>`;
    var iwPosition = new kakao.maps.LatLng(rel.relLatitude, rel.relLongitude); //인포윈도우 표시 위치
    var iwRemoveable = true;

    var infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
      removable : iwRemoveable
    });

    infowindow.open(this.map, marker); 

    kakao.maps.event.addListener(marker, 'click', this.makeClickListener(this.map, marker, infowindow));

    setTimeout(() => {
      this.map.relayout();
      this.map.setCenter(markerPosition);
    }, 500);
  }

  makeClickListener(map, marker, infowindow) {
    return function () {
      infowindow.open(map, marker);
    };
  }

  // 지하철역으로 검색 시 역을 중심으로 결과 나오게끔 
  // 37.5171771,127.0401547 강남구청역
  // 37.497953,127.0260894 강남역
  // SubwayInfo에 좌표값 넣어야 하는지 고민해보기
  // 우선은 각 식당 리스트들의 중평균값으로 center 잡음
  makeMapBySubway2(subwayNum?: number, rels?: RestaurantList[]) {
    var relsLength = this._cs.getObjectLength(rels);
    var avgLatitude = 0;
    var avgLongitude = 0;

    for (var rel of rels) {
      avgLatitude += rel.relLatitude;
      avgLongitude += rel.relLongitude;
    }
    avgLatitude = avgLatitude / relsLength;
    avgLongitude = avgLongitude / relsLength;

    console.log('center : ' + avgLatitude + ' ,' + avgLongitude)

    var container = document.getElementById('kakao-map');
    var options = {
      center: new kakao.maps.LatLng(avgLatitude, avgLongitude),
      level: 4
    };
    this.map = new kakao.maps.Map(container, options);

    console.log(rels);
    var positions = [];

    if (rels) {
      for (var rel of rels) {
        positions.push({
          title: rel.relName,
          latlng: new kakao.maps.LatLng(rel.relLatitude, rel.relLongitude)
        });
      }
    }

    // 마커 이미지의 이미지 주소
    var imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    // for (var i = 0; i < positions.length; i++) {
    for (var i = 0; i < positions.length; i++) {

      // 마커 이미지의 이미지 크기
      var imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성  
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성
      var marker = new kakao.maps.Marker({
        map: this.map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
        image: markerImage // 마커 이미지 
      });

      // marker.setMap(this.map);
    }
  }



  makeMapBySubway(subwayNum?: number, rels?: RestaurantList[]) {
    var relsLength = this._cs.getObjectLength(rels);
    var avgLatitude = 0;
    var avgLongitude = 0;

    for (var rel of rels) {
      avgLatitude += rel.relLatitude;
      avgLongitude += rel.relLongitude;
    }
    avgLatitude = avgLatitude / relsLength;
    avgLongitude = avgLongitude / relsLength;

    console.log('center : ' + avgLatitude + ' ,' + avgLongitude)

    var container = document.getElementById('kakao-map');
    var options = {
      center: new kakao.maps.LatLng(avgLatitude, avgLongitude),
      level: 4
    };
    this.map = new kakao.maps.Map(container, options);

    console.log(rels);

    // 마커 이미지의 이미지 주소
    var imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    // for (var i = 0; i < positions.length; i++) {
    for (let rel of rels) {

      // 마커 이미지의 이미지 크기
      var imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성  
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성
      var marker = new kakao.maps.Marker({
        map: this.map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(rel.relLatitude, rel.relLongitude),
        // title: rel.relName, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
        image: markerImage // 마커 이미지 
      });

      // var iwContent = '<div style="padding:5px; width:450px; height:80px; border: 1px solid red; border-radius: 5px">' + rel.relName + '<br>' + rel.relCall + '<br>' + rel.relSubAddress + '<br>&nbsp;</div>';//인포윈도우 내용
      var iwContent = `<div style="padding:5px; width:450px; height:auto; border: 1px solid black; border-radius: 5px; background-color: #FFF;"><img src="${rel.meiImg1Name}" style="width:10%; height:auto;">&nbsp;<b>${rel.relName}</b><br>${rel.relCall}<br>${rel.relSubAddress}<br></div>`;//인포윈도우 내용
      var iwPosition = new kakao.maps.LatLng(rel.relLatitude, rel.relLongitude); //인포윈도우 표시 위치
      
      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        position: iwPosition,
        content: iwContent
      });

      // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
      // infowindow.open(this.map, marker);
      // 그러나 마우스 오버 이벤트 사용하므로 안쓸라고;
      kakao.maps.event.addListener(marker, 'mouseover', this.makeOverListener(this.map, marker, infowindow));
      kakao.maps.event.addListener(marker, 'mouseout', this.makeOutListener(infowindow));
      // 마커에 클릭이벤트를 등록
      // kakao.maps.event.addListener(marker, 'click', function () {
      //   // 클릭시 상세 페이지로 새페이지 열리게끔 ! 아..? 새로 안열려야하나
      //   // window.open(`http://localhost/result/${rel.relNum}`);
      // 
      // });
      kakao.maps.event.addListener(marker, 'click', () => {
        this._router.navigateByUrl('/result/' + rel.relNum);
      });
    }
  }

  makeOverListener(map, marker, infowindow) {
    return function () {
      infowindow.open(map, marker);
    };
  }

  makeOutListener(infowindow) {
    return function () {
      infowindow.close();
    };
  }

}
