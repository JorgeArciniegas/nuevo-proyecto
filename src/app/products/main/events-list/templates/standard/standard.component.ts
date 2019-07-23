import { Component, Input } from '@angular/core';
import { EventsList } from '../../event-list.model';
import { MainService } from '../../../main.service';
import { UserService } from '../../../../../services/user.service';
@Component({
  selector: 'app-events-list-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.scss']
})
export class StandardComponent {
  @Input() nativeColumnDefinition: number;
  @Input() webColumnDefinition: number;
  @Input() rowHeight: number;
  @Input() eventsList: EventsList;
  constructor(private mainService: MainService, private userService: UserService) {}

  eventSelecting(selected: number) {
    this.mainService.fireCurrentEventChange(selected, true);
  }
}
