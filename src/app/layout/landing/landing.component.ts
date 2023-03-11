import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  // encapsulation: ViewEncapsulation,
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  
 // providers: [NgbCarouselConfig], // add NgbCarouselConfig to the component providers
})
export class LandingComponent implements OnInit {
  /**
   *
   */
  images: any = [];
  images2: any = [];
immagesIsAvailable : boolean = true;
showNavigationArrows = false;
showNavigationIndicators = false;
  constructor() {

  }
  ngOnInit() {

    this.images2 = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
    this.images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);

  //   this.images = [
  //     { random: 'Random', picture: 'https://picsum.photos/id/944/900/500' },
  //     { random: 'Samoa', picture: 'https://picsum.photos/id/1011/900/500' },
  //     { random: 'Tonga', picture: 'https://picsum.photos/id/984/900/500' },
  //     {
  //       random: 'Cook Island',
  //       picture: 'https://picsum.photos/id/944/900/500',
  //     },
  //     { random: 'Niue', picture: 'https://picsum.photos/id/1011/900/500' },
  //     {
  //       random: 'American Samoa',
  //       picture: 'https://picsum.photos/id/984/900/500',
  //     },
  //   ];
  }
}
