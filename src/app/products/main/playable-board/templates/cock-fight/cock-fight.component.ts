import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../../../main.service';
import { ProductsService } from '../../../../products.service';

@Component({
  selector: 'app-playable-board-cock-fight',
  templateUrl: './cock-fight.component.html',
  styleUrls: ['./cock-fight.component.scss']
})
export class CockFightComponent implements OnInit {
  @Input()
  public rowHeight: number;

  constructor(public service: MainService, private productService: ProductsService) {}

  ngOnInit() {}
}
