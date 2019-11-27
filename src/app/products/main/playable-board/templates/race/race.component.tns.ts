import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { UserService } from '../../../../../services/user.service';
import { LoaderService } from '../../../../../services/utility/loader/loader.service';
import { RouterService } from '../../../../../services/utility/router/router.service';
import { ProductsService } from '../../../../products.service';
import { Player, SpecialBet, TypePlacingEvent } from '../../../main.models';
import { MainService } from '../../../main.service';

@Component({
  moduleId: module.id,
  selector: 'app-playable-board-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent implements OnInit, OnDestroy {
  @Input()
  public rowHeight: number;
  @Input()
  public show?: boolean;

  public TypePlacingRace = TypePlacingEvent;
  public specialBet: typeof SpecialBet = SpecialBet;

  public get playersList(): Player[] {
    return this.service.playersList;
  }

  // code of product. it's used for change the layout color to buttons.
  public get codeProduct(): string {
    return this.productService.product.codeProduct;
  }

  constructor(
    public service: MainService,
    private productService: ProductsService,
    private userService: UserService,
    private loaderService: LoaderService,
    private router: RouterService) {

  }

  ngOnInit() {
    if (this.router.productSameReload) {
      this.router.productSameReload = false;
      // it's required for disable the spinner is loading when the product selected is same to product menu touched.
      timer(50).subscribe(() => this.loaderService.setLoading(false, null));
    }
  }

  ngOnDestroy() {
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
