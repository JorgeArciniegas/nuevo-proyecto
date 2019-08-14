import { Component, OnInit } from '@angular/core';
import { Lucky } from '../../lucky.model';
import { UserService } from '../../../../../services/user.service';
import { MainService } from '../../../main.service';
import { Subscription } from 'rxjs';
import { VirtualBetEvent, VirtualBetSelection } from '@elys/elys-api';
import { Market } from '../../../../products.model';

@Component({
  selector: 'app-lucky-cock-fight',
  templateUrl: './cock-fight.component.html',
  styleUrls: ['./cock-fight.component.scss']
})
export class CockFightComponent implements OnInit {
  public market: typeof Market = Market;

  lucky: typeof Lucky = Lucky;
  /**
   * contains "winning" selections
   */
  winModel = [];
  /**
   * contains "winning + o/u" selections
   */
  ouWinModel = [];
  /**
   * contains "winning + sector" selections
   */
  sectorWinModel = [];
  /**
   * store the previous lucky selection
   */
  oldLuckyCock = 0;
  /**
   * switch to detect if the event is changed, if so, reload currentEvent
   */
  private isNewEvent = true;
  evtChangeSubscription: Subscription;
  private currentEvent: VirtualBetEvent;
  constructor(private userService: UserService, private mainService: MainService) {
    this.evtChangeSubscription = this.mainService.currentEventSubscribe.subscribe(event => {
      /**
       * listen to event change
       */
      this.isNewEvent = true;
      this.oldLuckyCock = 0;
    });
  }
  ngOnInit() {}

  async placingLucky(lucky: Lucky): Promise<void> {
    this.mainService.resetPlayEvent();
    /**
     * when a lucky button is clicked check if the event is changed, if it is, currentEvent is populated with new data and
     * the market selection containers are refreshed
     */
    if (this.isNewEvent) {
      // code inside this if is executed only when a new event is loaded

      // reset market selections containers
      this.winModel = [];
      this.ouWinModel = [];
      this.sectorWinModel = [];
      this.currentEvent = await this.mainService.getCurrentEvent();
      this.currentEvent.mk.forEach(eventMarkets => {
        /**
         * populates market selection containers by market type
         */
        switch (eventMarkets.tp) {
          case this.market['1X2']: // winner
            eventMarkets.sls.forEach(marketSelections => {
              this.winModel.push(marketSelections);
            });
            break;
          case this.market['1X2OverUnder']: // winner + o/u
            eventMarkets.sls.forEach(marketSelections => {
              // exclude X + O/U
              if (marketSelections.tp !== 3) {
                this.ouWinModel.push(marketSelections);
              }
            });
            break;
          case this.market['1X2WinningSector']: // winner + sector
            eventMarkets.sls.forEach(marketSelections => {
              this.sectorWinModel.push(marketSelections);
            });
            break;
        }
      });
      this.isNewEvent = false;
    }
    /**
     * code below is always executed when a lucky button is clicked.
     * Selects the lucky selection from the market selections container, choosed by clicking "Lucky 1", "Lucky 2" or "Lucky 3"
     * and pick up the lucky selection depending on the RNG
     */
    const currentSelection = { tp: 0, selection: null };
    switch (lucky) {
      case 1:
        currentSelection.selection = this.winModel[this.RNGLuckyCock(3)];
        currentSelection.tp = this.market['1X2'];
        break;
      case 2:
        currentSelection.selection = this.ouWinModel[this.RNGLuckyCock(4)];
        currentSelection.tp = this.market['1X2OverUnder'];
        break;
      case 3:
        currentSelection.selection = this.sectorWinModel[this.RNGLuckyCock(8)];
        currentSelection.tp = this.market['1X2WinningSector'];
        break;
    }
    /**
     * check if the current selection is equal to the previous
     */
    if (this.oldLuckyCock === 0 || this.oldLuckyCock !== currentSelection.selection.id) {
      this.oldLuckyCock = currentSelection.selection.id;
      /**
       * places the selection on the main service
       */
      this.mainService.placingOddByOdd(currentSelection.tp, currentSelection.selection);
    } else {
      this.placingLucky(lucky);
    }
  }
  /**
   * @param limit is the max limit for the RNG
   * 1 on 3 for market "Winner"
   * 1 on 4 for market "Winner + O/U"
   * 1 on 8 for market "Winner + Sector"
   */
  RNGLuckyCock(limit: number): number {
    const extractNumber: number = Math.floor(Math.random() * limit);
    return extractNumber;
  }
}
