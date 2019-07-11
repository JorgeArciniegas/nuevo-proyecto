import { Component, OnInit } from '@angular/core';
import { LuckyService } from '../../lucky.service';
import { Lucky } from '../../lucky.model';
import { UserService } from '../../../../../../../src/app/services/user.service';
import { MainService } from '../../../main.service';

@Component({
  selector: 'app-lucky-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss']
})
export class RaceComponent implements OnInit {
  lucky: typeof Lucky = Lucky;
  constructor(
    private luckyService: LuckyService,
    private userService: UserService,
    private mainService: MainService
  ) {}

  ngOnInit() {}
}
