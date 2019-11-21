import { Component, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NguCarouselConfig, NguCarousel } from '@ngu/carousel';

@Component({
  selector: 'app-topCarousel',
  templateUrl: './topCarousel.component.html',
  styleUrls: ['./topCarousel.component.css']
})
export class TopCarouselComponent implements AfterViewInit {

  name = 'Angular';
  slideNo = 0;
  withAnim = true;
  resetAnim = true;
  
  @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs:1, sm: 1, md: 1, lg: 1, all: 0},
    load: 3,
    interval: {timing: 4000, initialDelay: 1000},
    loop: true,
    touch: true,
    velocity: 0.2

  }
  carouselItems = ['assets/images/11.jpg','assets/images/12.jpg','assets/images/13.jpg', 'assets/images/4.jpg'];
  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  reset() {
    this.myCarousel.reset(!this.resetAnim);
  }

  moveTo(slide) {
    this.myCarousel.moveTo(slide, !this.withAnim);
  }

}
