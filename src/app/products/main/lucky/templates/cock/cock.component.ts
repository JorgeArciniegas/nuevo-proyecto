import { Component, OnInit } from '@angular/core';
import { LuckyService } from '../../lucky.service';
import { Lucky } from '../../lucky.model';
import { UserService } from '../../../../../services/user.service';
import { MainService } from '../../../main.service';
import { Subscription } from 'rxjs';
import { VirtualBetEvent, VirtualBetSelection } from '@elys/elys-api';

@Component({
  selector: 'app-lucky-cock',
  templateUrl: './cock.component.html',
  styleUrls: ['./cock.component.scss']
})
export class CockComponent implements OnInit {
  lucky: typeof Lucky = Lucky;
  winModel = [];
  ouWinModel = [];
  sectorWinModel = [];
  oldLuckyCock = 0;
  private isNewEvent = true;
  // virtualBetEvent = VirtualB;
  public isLuckyAvailable = false;
  evtChangeSubscription: Subscription;
  evtDetailSubscription: Subscription;
  private currentEvent: VirtualBetEvent;
  constructor(
    private luckyService: LuckyService,
    private userService: UserService,
    private mainService: MainService
  ) {
    this.evtChangeSubscription = this.mainService.currentEventSubscribe.subscribe(
      event => {
        this.isLuckyAvailable = false;
        this.isNewEvent = true;
        this.oldLuckyCock = 0;
      }
    );
  }
  ngOnInit() {}

  async placingLucky(lucky: Lucky): Promise<void> {
    if (this.isNewEvent) {
      this.currentEvent = await this.mainService.getCurrentRace();
      this.currentEvent.mk.forEach(eventMarkets => {
        switch (eventMarkets.tp) {
          case 10:
            eventMarkets.sls.forEach(marketSelections => {
              this.winModel.push(marketSelections);
            });
            break;
          case 689:
            eventMarkets.sls.forEach(marketSelections => {
              if (marketSelections.tp !== 3) {
                this.ouWinModel.push(marketSelections);
              }
            });
            break;
          case 172:
            eventMarkets.sls.forEach(marketSelections => {
              this.sectorWinModel.push(marketSelections);
            });
            break;
        }
      });
      this.isNewEvent = false;
    }
    const currentSelection = { tp: 0, selection: null };
    switch (lucky) {
      case 1:
        currentSelection.selection = this.winModel[this.RNGLuckyCock(2)];
        currentSelection.tp = 10;
        break;
      case 2:
        currentSelection.selection = this.ouWinModel[this.RNGLuckyCock(3)];
        currentSelection.tp = 689;
        break;
      case 3:
        currentSelection.selection = this.sectorWinModel[this.RNGLuckyCock(7)];
        currentSelection.tp = 172;
        break;
    }
    if (
      this.oldLuckyCock === 0 ||
      this.oldLuckyCock !== currentSelection.selection.id
    ) {
      this.oldLuckyCock = currentSelection.selection.id;
      console.log(currentSelection.tp, currentSelection.selection.id);
      // this.mainService.placingOddByOdd(currentSelection.tp, currentSelection.selection.id);
    } else {
      this.placingLucky(lucky);
    }
  }
  RNGLuckyCock(limit: number): number {
    const extractNumber: number = Math.floor(Math.random() * limit) + 1;
    return extractNumber;
  }
}
