import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../../../main.service';
import { ProductsService } from '../../../../../products/products.service';

@Component({
  selector: 'app-playable-board-cock-fight',
  templateUrl: './playable-board-cock-fight.component.html',
  styleUrls: ['./playable-board-cock-fight.component.scss']
})
export class PlayableBoardCockFightComponent implements OnInit {
  @Input()
  public rowHeight: number;

  constructor(public service: MainService, private productService: ProductsService) {}

  ngOnInit() {}
}
