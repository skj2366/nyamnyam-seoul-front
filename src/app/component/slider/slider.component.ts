import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @ViewChild('nav') slider: NgImageSliderComponent;
  @Input() data;
  constructor() { }

  ngOnInit() {
    this.setSlider();
    this.setImageObject();
  }

  imageObject: Array<object> = [
    {
      image: 'assets/imgs/alone.jpg',
      thumbImage: 'assets/imgs/alone.jpg',
      alt: 'alt of image'
    },
    {
      image: 'assets/imgs/alone.jpg',
      thumbImage: 'assets/imgs/alone.jpg',
      alt: 'alt of image',
      title: 'title of image'
    },
    {
      image: 'assets/imgs/alone.jpg',
      thumbImage: 'assets/imgs/alone.jpg',
      alt: 'alt of image',
      title: 'title of image'
    },
    {
      image: 'assets/imgs/alone.jpg',
      thumbImage: 'assets/imgs/alone.jpg',
      alt: 'alt of image',
      title: 'title of image'
    },
    {
      image: 'assets/imgs/alone.jpg',
      thumbImage: 'assets/imgs/alone.jpg',
      alt: 'alt of image',
      title: 'title of image'
    },
    {
      image: 'assets/imgs/alone.jpg',
      thumbImage: 'assets/imgs/alone.jpg',
      alt: 'alt of image',
      title: 'title of image'
    },
    {
      image: 'assets/imgs/alone.jpg',
      thumbImage: 'assets/imgs/alone.jpg',
      alt: 'alt of image',
      title: 'title of image'
    },
    {
      image: 'assets/imgs/alone.jpg',
      thumbImage: 'assets/imgs/alone.jpg',
      alt: 'alt of image',
      title: 'title of image'
    },
    {
      image: 'assets/imgs/alone.jpg',
      thumbImage: 'assets/imgs/alone.jpg',
      alt: 'alt of image',
      title: 'title of image'
    },
    {
      image: 'assets/imgs/alone.jpg',
      thumbImage: 'assets/imgs/alone.jpg',
      alt: 'alt of image',
      title: 'title of image'
    },
    {
      image: 'assets/imgs/alone.jpg',
      thumbImage: 'assets/imgs/alone.jpg',
      alt: 'alt of image',
      title: 'title of image'
    },
    {
      image: 'assets/imgs/alone.jpg',
      thumbImage: 'assets/imgs/alone.jpg',
      alt: 'alt of image',
      title: 'title of image'
    },
    {
      image: 'assets/imgs/alone.jpg',
      thumbImage: 'assets/imgs/alone.jpg',
      alt: 'alt of image',
      title: 'title of image'
    },
    {
      image: 'assets/imgs/alone.jpg',
      thumbImage: 'assets/imgs/alone.jpg',
      alt: 'alt of image',
      title: 'title of image'
    },
  ];

  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
    this.slider.next();
  }

  setImageObject() {
    // if(!this.data && this.data.length() != 0) {
    //   this.imageObject = new Array<object>;
    //   this.imageObject.push()
    // }
    console.log(this.data);
  }

  setSlider() {
    this.slider.animationSpeed = 1;
    this.slider.autoSlide = 3;
    this.slider.infinite = true;
    this.slider.slideImage = 1;
    this.slider.imageSize = {
      width: 300, height: 200, space: 3
    };
  }
}
