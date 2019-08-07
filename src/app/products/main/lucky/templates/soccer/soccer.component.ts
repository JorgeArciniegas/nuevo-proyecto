import { Component, OnInit, ɵConsole } from '@angular/core';
import { Lucky } from '../../lucky.model';
import { MainService } from '../../../main.service';
import { MarketArea, Area } from '../../../main.models';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-lucky-soccer',
  templateUrl: './soccer.component.html',
  styleUrls: ['./soccer.component.scss']
})
export class SoccerComponent {
  lucky: typeof Lucky = Lucky;
  constructor(private mainService: MainService, public userService: UserService) {}

  /**
   *
   * @param lucky
   */
  public async placeLucky(lucky: Lucky): Promise<void> {
    // reset all odds selected
    this.mainService.resetPlayEvent();
    const extractMatchesIdx: number[] = lucky !== Lucky.Lucky10 ? this.rngMatches(lucky) : this.selectAllMatches();
    const tournament = await this.mainService.getCurrentTournament();

    this.rngMarketsAndPlace(extractMatchesIdx, tournament.overviewArea);
  }

  /**
   *
   */
  private selectAllMatches(): number[] {
    const extractMatchesIdx: number[] = [];
    for (let i = 0; i < Lucky.Lucky10; i++) {
      extractMatchesIdx.push(i + 1);
    }
    return extractMatchesIdx;
  }

  /**
   *
   * @param extractCounterIdx
   */
  private rngMatches(extractCounterIdx: number): number[] {
    const extractMatchesIdx: number[] = [];
    while (true) {
      const extractNumber: number = Math.floor(Math.random() * 10);
      if (!extractMatchesIdx.includes(extractNumber)) {
        extractMatchesIdx.push(extractNumber);
        extractCounterIdx--;
      }
      if (extractCounterIdx === 0) {
        return extractMatchesIdx;
      }
    }
  }

  /**
   *
   * @param extractMatchesIdx
   * @param areas
   */
  private rngMarketsAndPlace(extractMatchesIdx: number[], areas: Area[]): void {
    while (extractMatchesIdx.length > 0) {
      const match = extractMatchesIdx.shift() - 1;
      const tournament = areas[match].markets;
      const rngMarkets = Math.floor(Math.random() * tournament.length);
      const rngSelection = Math.floor(Math.random() * areas[match].markets[rngMarkets].selectionCount);
      this.mainService.placingOddByOdd(
        areas[match].markets[rngMarkets].selections[rngSelection].tp,
        areas[match].markets[rngMarkets].selections[rngSelection]
      );
    }
  }
}
