import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { UserService } from '../../../../../services/user.service';
import { LoaderService } from '../../../../../services/utility/loader/loader.service';
import { MainService } from '../../../main.service';
import { SoccerService } from './soccer.service';

@Component({
  selector: 'app-playable-board-soccer',
  templateUrl: './soccer.component.html',
  styleUrls: ['./soccer.component.scss']
})
export class SoccerComponent implements OnInit, OnDestroy {
  @Input()
  public rowHeight: number;

  constructor(
    public soccerService: SoccerService,
    public mainService: MainService,
    public userService: UserService,
    private loaderService: LoaderService) {
    this.soccerService.subscribeToObservables();
  }

  ngOnInit() {
    // it's required for disable the spinner is loading when the product selected is same to product menu touched.
    timer(300).subscribe(() => this.loaderService.setLoading(false, null));
  }

  ngOnDestroy() {
    this.soccerService.destroySubscriptions();
  }

  // Method to open the details of the selected match
  openEventDetails(matchIndex: number): void {
    this.soccerService.openEventDetails(matchIndex);
  }
}
