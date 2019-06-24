import { Component, OnInit, Input } from '@angular/core';
import { EventsList } from '../../event-list.model';
import { MainService } from '../../../main.service';
@Component({
  selector: 'app-standard-list',
  templateUrl: './standard-list.component.html',
  styleUrls: ['./standard-list.component.scss']
})
export class StandardListComponent implements OnInit {
  @Input() items: number;
  @Input() rowHeight: number;
  @Input() eventsList: EventsList;
  constructor(private mainService: MainService) {}

  ngOnInit() {
    setTimeout(() => {
      console.log(this.eventsList.events.length);
    }, 1000);
  }

  raceSelecting(selected: number) {
    this.mainService.fireCurrentRaceChange(selected, true);
  }
}
