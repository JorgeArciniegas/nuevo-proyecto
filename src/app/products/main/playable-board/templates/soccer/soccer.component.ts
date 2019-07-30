import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { VirtualBetSelection } from '@elys/elys-api';
import { Subscription, timer } from 'rxjs';
import { MainService } from '../../../main.service';
import { VirtualBetTournamentExtended, Match } from '../../../main.models';
import { PolyfunctionalArea } from 'src/app/products/products.model';
import { ProductsService } from 'src/app/products/products.service';

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
  public oddsSelected: number[];
  private polyfunctionalAreaSubscription: Subscription;

  constructor(private mainService: MainService, private productService: ProductsService) {
    this.oddsSelected = [];
    // Get the event's detail at the access of the section
    this.getTournamentDetails();
  }

  ngOnInit() {
    // Get the event's details.
    this.currentEventSubscription = this.mainService.currentEventObserve.subscribe(() => {
      this.getTournamentDetails();
    });

    // Get the change of the polyfunctional area's object.
    this.polyfunctionalAreaSubscription = this.productService.polyfunctionalAreaObservable.subscribe(polyfunctional => {
      // Delete the list of selections when the object of polyfunctional area is empty.
      if (polyfunctional.odds.length === 0 && this.oddsSelected.length !== 0) {
        this.oddsSelected = [];
      } else {
        this.checkOddSelected(polyfunctional);
      }
    });
  }

  ngOnDestroy() {
    this.currentEventSubscription.unsubscribe();
    this.polyfunctionalAreaSubscription.unsubscribe();
  }

  /**
   * Method to get the details of the currently selected tournament (week).
   * @param attemptsNumber The number of attempted call executed. Limit of attempts is 5 recall.
   */
  getTournamentDetails(attemptsNumber: number = 0): void {
    this.mainService
      .getCurrentTournament()
      .then(tournamentDetails => {
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

  selectOdd(marketId: number, selection: VirtualBetSelection): void {
    const index = this.oddsSelected.indexOf(selection.id);
    // Insert or delete the selection from the list.
    if (index === -1) {
      this.oddsSelected.push(selection.id);
    } else {
      this.oddsSelected.splice(index, 1);
    }
    this.mainService.placingOddByOdd(marketId, selection);
  }

  /**
   * When "oddsSelected" does not have the odds contains from "polifunctionalArea", append it.
   * @param polyfunctional PolyfunctionalArea
   */
  private checkOddSelected(polyfunctional: PolyfunctionalArea): void {
    polyfunctional.odds.filter(item => {
      if (!this.oddsSelected.includes(item.id)) {
        this.oddsSelected.push(item.id);
      }
    });
  }
}
