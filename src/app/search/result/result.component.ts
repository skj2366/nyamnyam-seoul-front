import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { RestaurantList } from 'src/app/vo/restaurant-list';
import { ActivatedRoute } from '@angular/router';
import { MenuInfo } from 'src/app/vo/menu-info';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  rel : RestaurantList;
  menu : MenuInfo[];
  rNum : number;

  constructor(private route : ActivatedRoute, private _cs : CommonService) { }

  async ngOnInit() {    
    var relNum = this.route.snapshot.paramMap.get('relNum');
    this.getRestaurantDetail(relNum);
    this.getMenu(relNum);
  }

  getRestaurantDetail(rNum) {
    var url = `/reln/${rNum}`;
    this._cs.get(url).subscribe(
      res => {
          this.rel = <RestaurantList>res;          
          console.log(res);
          
        }
      , err => {
          console.log(err);
        }      
    )
  }

  getMenu(rNum) {
    var url = `/mei/${rNum}`;
    this._cs.get(url).subscribe(
      res => {
        this.menu = <MenuInfo[]>res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

}
