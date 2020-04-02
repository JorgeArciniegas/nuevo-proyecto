import { EventResult } from './../../results.model';
import { AmericanRouletteRug, COLORS } from './../../../playable-board/templates/american-roulette/american-roulette.models';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-results-americanroulette',
  templateUrl: './americanroulette.component.html',
  styleUrls: ['./americanroulette.component.scss']
})



export class AmericanrouletteComponent implements OnInit {

  @Input() results: EventResult[];
  @Input() rowHeight: number;

  americanRouletteRug: AmericanRouletteRug;


  constructor() {
    this.americanRouletteRug = new AmericanRouletteRug();

   }


    ngOnInit() {
    }

    getColorClass(n: number | string): string {
      // tslint:disable-next-line:max-line-length
      return this.americanRouletteRug.red.includes(parseInt(n.toString(), 10)) ? 'red' : (this.americanRouletteRug.black.includes(parseInt(n.toString(), 10)) ? 'black' : 'green');
    }


}
