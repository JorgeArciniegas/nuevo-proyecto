import { Component, OnInit } from '@angular/core';
import { OperatorsService } from './operators.service';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {

  constructor(public operatorService: OperatorsService) { }

  ngOnInit() {
    this.operatorService.getListOfOperators();
  }

}
