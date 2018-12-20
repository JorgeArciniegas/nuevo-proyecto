import { Component, OnInit, Output } from '@angular/core';
import { Observable as ObservableIdle } from 'rxjs/Rx';
import { RaceTime } from '../../models/product.model';

@Component({
  selector: 'app-race-control',
  templateUrl: './race-control.component.html',
  styleUrls: ['./race-control.component.scss']
})
export class RaceControlComponent implements OnInit {
  public raceTime: RaceTime;

  @Output()
  public currentRace: number;

  constructor() {}

  ngOnInit() {
    this.raceTime = new RaceTime();
    this.currentRace = 377660;
    ObservableIdle.interval(1000).subscribe(() => this.getTime());
  }

  getTime(): void {
    if (this.raceTime.second == 0 && this.raceTime.minute == 0) {
      this.raceTime = new RaceTime();
      this.currentRace = this.currentRace + 1;
    } else {
      if (this.raceTime.second == 0) {
        this.raceTime.second = 59;
        this.raceTime.minute = this.raceTime.minute - 1;
      } else {
        this.raceTime.second = this.raceTime.second - 1;
      }
    }
  }
}
