import { Component, OnInit } from '@angular/core';
import { LuckyService } from '../../lucky.service';
import { Lucky } from '../../lucky.model';

@Component({
  selector: 'app-lucky-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent implements OnInit {
  lucky: typeof Lucky = Lucky;
  constructor(private luckyService: LuckyService) {}

  ngOnInit() {}
}
