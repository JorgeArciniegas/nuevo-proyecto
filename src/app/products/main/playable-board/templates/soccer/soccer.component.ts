import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { VirtualBetTournament, VirtualBetSelection } from '@elys/elys-api';
import { Subscription, timer } from 'rxjs';
import { MainService } from '../../../main.service';
import { VirtualBetTournamentExtended, Match } from '../../../main.models';
import { BtncalcService } from 'src/app/component/btncalc/btncalc.service';

@Component({
  selector: 'app-playable-board-soccer',
  templateUrl: './soccer.component.html',
  styleUrls: ['./soccer.component.scss']
})
export class SoccerComponent implements OnInit, OnDestroy {
  @Input()
  public rowHeight: number;
  private currentEventSubscription: Subscription;
  public tournament: VirtualBetTournamentExtended;
  public selectedMatch: Match;

   // List of odds selected.
   public oddsSelected: number[];
  constructor(private mainService: MainService, private btnCalcService: BtncalcService) {
    this.oddsSelected = [];
    // Get the event's detail at the access of the section
    this.getTournamentDetails();

    // Get the event's details.
    this.currentEventSubscription = this.mainService.currentEventObserve.subscribe(() => {
      this.getTournamentDetails();
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.currentEventSubscription.unsubscribe();
  }

  /**
   * Method to get the details of the currently selected tournament (week).
   * @param attemptsNumber The number of attempted call executed. Limit of attempts is 5 recall.
   */
  getTournamentDetails(attemptsNumber: number = 0) {
    this.mainService.getCurrentTournament().then(tournamentDetails => {
      this.tournament = tournamentDetails;
    })
    .catch(error => {
      // Limit of attempts is 5 recall.
      if (attemptsNumber < 5) {
        timer(5000).subscribe(() => this.getTournamentDetails(attemptsNumber + 1));
      } else {
        console.log(error);
      }
    });
  }


  selectOdd(marketId: number, selection: VirtualBetSelection) {
    const index = this.oddsSelected.indexOf(selection.id);
    // Insert or delete the selection from the list.
    if (index === -1) {
      this.oddsSelected.push(selection.id);
    } else {
      this.oddsSelected.splice(index, 1);
    }
    this.mainService.placingOddByOdd(marketId, selection);
    // tap su plus automatico
    this.btnCalcService.tapPlus();
  }

}
