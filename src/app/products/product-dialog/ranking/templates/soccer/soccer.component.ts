import { Component, OnInit, Input } from '@angular/core';
import { BetDataDialog } from 'src/app/products/products.model';

@Component({
  selector: 'app-ranking-soccer',
  templateUrl: './soccer.component.html',
  styleUrls: ['./soccer.component.scss']
})
export class SoccerComponent implements OnInit {
  @Input()
  data: BetDataDialog;

  constructor() {}

  ngOnInit() {}
}
