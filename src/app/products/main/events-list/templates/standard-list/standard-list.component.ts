import { Component, OnInit, Input } from '@angular/core';
import { EventList } from '../../event-list.model';
import { MainService } from '../../../main.service';
@Component({
  selector: 'app-standard-list',
  templateUrl: './standard-list.component.html',
  styleUrls: ['./standard-list.component.scss']
})
export class StandardListComponent implements OnInit {
  @Input() items: number;
  @Input() rowHeight: number;
  @Input() eventsList: EventList[];
  constructor(private mainService: MainService) {}

  ngOnInit() {}

  raceSelecting(selected: number) {
    this.mainService.fireCurrentRaceChange(selected, true);
  }
}
