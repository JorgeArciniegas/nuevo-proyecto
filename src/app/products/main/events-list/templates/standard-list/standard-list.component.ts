import { Component, Input } from '@angular/core';
import { EventsList } from '../../event-list.model';
import { MainService } from '../../../main.service';
@Component({
  selector: 'app-standard-list',
  templateUrl: './standard-list.component.html',
  styleUrls: ['./standard-list.component.scss']
})
export class StandardListComponent {
  @Input() nativeColumnDefinition: number;
  @Input() webColumnDefinition: number;
  @Input() rowHeight: number;
  @Input() eventsList: EventsList;
  constructor(private mainService: MainService) {}

  raceSelecting(selected: number) {
    this.mainService.fireCurrentRaceChange(selected, true);
  }
}
