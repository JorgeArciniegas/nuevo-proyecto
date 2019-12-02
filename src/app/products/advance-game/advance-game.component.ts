import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TypePlacingEvent } from '../main/main.models';
import { MainService } from '../main/main.service';
import { UserService } from '../../../../src/app/services/user.service';
import { AdvButton } from './advance-game.model';
import { timer, Subscription } from 'rxjs';
import { LayoutProducts, LAYOUT_TYPE } from '../../../../src/environments/environment.models';
import { ProductsService } from '../products.service';

@Component({
  moduleId: module.id,
  selector: 'app-advance-game, [app-advance-game]',
  templateUrl: './advance-game.component.html',
  styleUrls: ['./advance-game.component.scss']
})
export class AdvanceGameComponent implements OnInit, OnDestroy {

  @Input()
  public timeBlocked = false;
  @Input()
  public rowHeight: number;

  public buttons: AdvButton[] = [];
  // change product subscription
  productNameSubscription: Subscription;
  // Layout current product
  layoutProducts: LayoutProducts;
  layoutType: typeof LAYOUT_TYPE = LAYOUT_TYPE;

  constructor(public service: MainService, private productService: ProductsService, private userService: UserService) {

    this.productNameSubscription = this.productService.productNameSelectedObserve.subscribe(() => {
      this.getLayout();
    });
  }

  ngOnInit() {
    this.buttons.push({
      label: TypePlacingEvent[0],
      code: TypePlacingEvent['ST']
    });
    this.buttons.push({
      label: TypePlacingEvent[1],
      code: TypePlacingEvent['ACCG']
    });
    this.buttons.push({
      label: TypePlacingEvent[2],
      code: TypePlacingEvent['R']
    });

    this.getLayout();
  }

  ngOnDestroy(): void {
    this.productNameSubscription.unsubscribe();
  }

  setTypePlacing(type: TypePlacingEvent): void {
    this.service.typePlacing(type);
  }

  getLayout(attemptsNumber: number = 0): void {
    this.productService.getCurrentLayoutProducts()
      .then(layout => {
        this.layoutProducts = layout;
      })
      .catch(error => {
        if (attemptsNumber < 5) {
          timer(1000)
            .subscribe(() => this.getLayout(attemptsNumber + 1))
            .unsubscribe();
        } else {
          console.log(error);
        }
      }
      );
  }
}

