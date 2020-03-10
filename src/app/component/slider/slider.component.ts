import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @ViewChild('nav') slider: NgImageSliderComponent;
  @Input() data: any;
  constructor(private _cs: CommonService) { }

  ngOnInit() {
    this.setSlider();
    this.setImageObject();
  }

  // imageObject: Array<object> = [
  //   {
  //     image: 'assets/imgs/alone.jpg',
  //     thumbImage: 'assets/imgs/alone.jpg',
  //     alt: 'alt of image'
  //   },
  //   {
  //     image: 'assets/imgs/alone.jpg',
  //     thumbImage: 'assets/imgs/alone.jpg',
  //     alt: 'alt of image',
  //     title: 'title of image'
  //   },
  //   {
  //     image: 'assets/imgs/alone.jpg',
  //     thumbImage: 'assets/imgs/alone.jpg',
  //     alt: 'alt of image',
  //     title: 'title of image'
  //   },
  //   {
  //     image: 'assets/imgs/alone.jpg',
  //     thumbImage: 'assets/imgs/alone.jpg',
  //     alt: 'alt of image',
  //     title: 'title of image'
  //   },
  //   {
  //     image: 'assets/imgs/alone.jpg',
  //     thumbImage: 'assets/imgs/alone.jpg',
  //     alt: 'alt of image',
  //     title: 'title of image'
  //   },
  //   {
  //     image: 'assets/imgs/alone.jpg',
  //     thumbImage: 'assets/imgs/alone.jpg',
  //     alt: 'alt of image',
  //     title: 'title of image'
  //   },
  //   {
  //     image: 'assets/imgs/alone.jpg',
  //     thumbImage: 'assets/imgs/alone.jpg',
  //     alt: 'alt of image',
  //     title: 'title of image'
  //   },
  //   {
  //     image: 'assets/imgs/alone.jpg',
  //     thumbImage: 'assets/imgs/alone.jpg',
  //     alt: 'alt of image',
  //     title: 'title of image'
  //   },
  //   {
  //     image: 'assets/imgs/alone.jpg',
  //     thumbImage: 'assets/imgs/alone.jpg',
  //     alt: 'alt of image',
  //     title: 'title of image'
  //   },
  //   {
  //     image: 'assets/imgs/alone.jpg',
  //     thumbImage: 'assets/imgs/alone.jpg',
  //     alt: 'alt of image',
  //     title: 'title of image'
  //   },
  //   {
  //     image: 'assets/imgs/alone.jpg',
  //     thumbImage: 'assets/imgs/alone.jpg',
  //     alt: 'alt of image',
  //     title: 'title of image'
  //   },
  //   {
  //     image: 'assets/imgs/alone.jpg',
  //     thumbImage: 'assets/imgs/alone.jpg',
  //     alt: 'alt of image',
  //     title: 'title of image'
  //   },
  //   {
  //     image: 'assets/imgs/alone.jpg',
  //     thumbImage: 'assets/imgs/alone.jpg',
  //     alt: 'alt of image',
  //     title: 'title of image'
  //   },
  //   {
  //     image: 'assets/imgs/alone.jpg',
  //     thumbImage: 'assets/imgs/alone.jpg',
  //     alt: 'alt of image',
  //     title: 'title of image'
  //   },
  // ];
  imageObject: Array<object> = [];
  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
    this.slider.next();
  }

  setImageObject() {
    this.imageObject = new Array();
    console.log(this.imageObject);
    if (this._cs.getObjectLength(this.data) != 0) {
      for(let res of this.data) {
        if(res['meiImg1Name']) {
          this.imageObject.push({
            image: res['meiImg1Name'],
            thumbImage: res['meiImg1Name'],
            alt: res['meiName']
          });
        }
        console.log(this.imageObject);
      }
    } else {
      console.log('이미지 엄슴');
      this.imageObject.push({
        image: 'assets/imgs/logo_500_305.png',
        thumbImage: 'assets/imgs/logo_500_305.png',
        alt: "nyamnyam-seoul"
      });
    }
    console.log(this.data);
  }

  setSlider() {
    this.slider.animationSpeed = 1;
    this.slider.autoSlide = 3;
    this.slider.infinite = true;
    this.slider.slideImage = 1;
    this.slider.imageSize = {
      width: '99%', height: '305px', space: 3
    };
  }
}
