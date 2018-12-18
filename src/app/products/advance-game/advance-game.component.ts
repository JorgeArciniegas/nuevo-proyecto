import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advance-game',
  templateUrl: './advance-game.component.html',
  styleUrls: ['./advance-game.component.scss']
})
export class AdvanceGameComponent implements OnInit {
  public buttons: AdvButton[] = [];

  constructor() {}

  ngOnInit() {
    this.buttons.push({ label: 'ST', code: 'ST' });
    this.buttons.push({ label: 'ACC G', code: 'ACC G' });
    this.buttons.push({ label: 'R', code: 'R' });
  }
}

export class AdvButton {
  public label: string;
  public code: string;
}
