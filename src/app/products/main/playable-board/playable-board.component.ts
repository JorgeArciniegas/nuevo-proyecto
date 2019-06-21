import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LAYOUT_TYPE } from '../../../../../src/environments/environment.models';
import { ProductsService } from '../../products.service';
import { SpecialBet, TypePlacingRace } from '../main.models';

@Component({
  selector: 'app-playable-board',
  templateUrl: './playable-board.component.html',
  styleUrls: ['./playable-board.component.scss']
})
export class PlayableBoardComponent {
  @Input()
  public rowHeight: number;
  @Input()
  public show?: boolean;
  public typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;


  constructor(public productService: ProductsService) { }

}
