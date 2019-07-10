import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../../../main.service';
import { ProductsService } from '../../../../products.service';
import { VirtualBetEvent } from '@elys/elys-api';

@Component({
  selector: 'app-playable-board-cock-fight',
  templateUrl: './cock-fight.component.html',
  styleUrls: ['./cock-fight.component.scss']
})
export class CockFightComponent implements OnInit {
  @Input()
  public rowHeight: number;
  public eventDetails: VirtualBetEvent;

  constructor(public service: MainService, private productService: ProductsService) {
    // Get the event's details
    this.eventDetails = this.service.getCurrentEventDetails();
    this.service.currentEventObserve.subscribe(eventIndex => {
      this.eventDetails = this.service.getCurrentEventDetails(eventIndex);
    });
    console.log(this.eventDetails);
  }

  ngOnInit() {}
}
