import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TypePlacingEvent, Player, SpecialBet } from '../../../main.models';
import { MainService } from '../../../main.service';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../../products.service';
import { UserService } from '../../../../../../../src/app/services/user.service';

@Component({
  selector: 'app-playable-board-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent {
  @Input()
  public rowHeight: number;
  @Input()
  public show?: boolean;

  public TypePlacingRace = TypePlacingEvent;
  public specialBet: typeof SpecialBet = SpecialBet;


  // list of players
  private _playersList: Player[];
  public get playersList(): Player[] {
    return this.service.playersList;
  }
  public set playersList(value: Player[]) {
    this._playersList = value;
  }

  // code of product. it's used for change the layout color to buttons
  private _codeProduct: string;

  public get codeProduct(): string {
    return this.productService.product.codeProduct;
  }

  public set codeProduct(value: string) {
    this._codeProduct = value;
  }
  constructor(public service: MainService, private productService: ProductsService, private userService: UserService) {

  }

  /**
   *
   * @param runnner
   */
  runnerplaced(runnner: Player): void {
    this.service.placingOdd(runnner);
  }

  /**
   *
   * @param type
   */
  specialBets(type: string): void {
    if (this.service.placingEvent.players.length > 0) {
      this.service.resetPlayEvent();
    }
    if (this.service.placingEvent.isSpecialBets && this.specialBet[type] === this.service.placingEvent.specialBetValue) {
      this.service.placingEvent.isSpecialBets = false;
      this.service.placingEvent.specialBetValue = null;
    } else {
      this.service.placingEvent.isSpecialBets = true;
      this.service.placingEvent.specialBetValue = this.specialBet[type];
    }
    this.service.placeOdd();
  }
}
