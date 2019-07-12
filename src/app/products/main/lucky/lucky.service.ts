import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { Lucky } from './lucky.model';
import { Player } from '../main.models';
import { LAYOUT_TYPE } from '../../../../../src/environments/environment.models';
@Injectable({
  providedIn: 'root'
})
export class LuckyService {
  oldLucky: string;
  typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;
  constructor(private mainService: MainService) {}
  /**
   * @param lucky number of players involved (1: winner 2: acc, 3: trifecta)
   */
  placingLucky(lucky: Lucky): void {
    this.mainService.resetPlayEvent();
    let n = '';
    // loop the number of player involved
    for (let i = 1; i <= lucky; i++) {
      while (true) {
        // for each one get the player number randomly according the current lucky (this.RNGLucky2(i);)
        const extTemp: number = this.RNGLucky2(i);
        // check if the player extracted already exists
        if (n.indexOf(extTemp.toString()) === -1) {
          n += extTemp;
          break;
        }
      }
    }
    // if the selection is not equals to oldLucky selected place bet
    if (n !== this.oldLucky || this.oldLucky === undefined) {
      // save the temporary selection
      this.oldLucky = n;
      for (let i = 0; i < n.length; i++) {
        const element = n.charAt(i);
        this.RNGLuckyPlacing(parseInt(element, 10), i + 1);
      }
    } else {
      this.placingLucky(lucky);
    }
  }
  /**
   * RNG FOR TO PLACE THE LUCKY
   */

  RNGLucky2(lucky: Lucky): number {
    const extractNumber: number =
      Math.floor(
        Math.random() *
          this.mainService.playersList.filter(
            player => player.position === lucky
          ).length
      ) + 1;
    return extractNumber;
  }

  RNGLuckyPlacing(playerNumber: number, playerPosition: number): void {
    // extract the player
    const playerExtract: Player = this.mainService.playersList.filter(
      player =>
        player.position === playerPosition && player.number === playerNumber
    )[0];
    // place the player
    this.mainService.placingOdd(playerExtract);
  }
}
