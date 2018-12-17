import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispay',
  templateUrl: './dispay.component.html',
  styleUrls: ['./dispay.component.scss']
})
export class DispayComponent implements OnInit {
  @Input()
  public rowHeight: number;

  constructor() {}

  ngOnInit() {}
}
