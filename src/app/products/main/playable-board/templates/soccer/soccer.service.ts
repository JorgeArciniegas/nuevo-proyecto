import { Injectable, OnDestroy } from '@angular/core';
import { VirtualBetSelection } from '@elys/elys-api';
import { MainService } from '../../../main.service';
import { VirtualBetTournamentExtended } from '../../../main.models';
import { ProductsService } from 'src/app/products/products.service';
import { Subscription, timer } from 'rxjs';
import { PolyfunctionalArea } from 'src/app/products/products.model';

@Injectable()
export class SoccerService implements OnDestroy {
  public tournament: VirtualBetTournamentExtended;
  // Index of the match array of the selected match;
  public selectedMatch: number;
  // Index of the areas array of the selected match;
  public selectedArea: number;
  public oddsSelected: number[];
  private currentEventSubscription: Subscription;
  private polyfunctionalAreaSubscription: Subscription;

  constructor(private mainService: MainService, private productService: ProductsService) {
    // Variables inizialization.
    this.selectedMatch = -1;
    // Set the default Area "Main".
    this.selectedArea = 0;
    this.oddsSelected = [];

    // Get the event's detail at the access of the section
    this.getTournamentDetails();

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

  // Method to open the details of the selected match
  openEventDetails(matchIndex: number): void {
    this.tournament.matches[matchIndex].isDetailOpened = !this.tournament.matches[matchIndex].isDetailOpened;
    // Reset the defaut Area "Main".
    this.selectedArea = 0;
    // Check if the match details is already open.
    if (this.selectedMatch === matchIndex) {
      // Remove the selected match.
      this.selectedMatch = -1;
    } else if (this.selectedMatch !== matchIndex && this.selectedMatch === -1) {
      // Set the new open match.
      this.selectedMatch = matchIndex;
    } else {
      // Change the status of the match whoes detail was open
      this.tournament.matches[this.selectedMatch].isDetailOpened = !this.tournament.matches[this.selectedMatch].isDetailOpened;
      // Set the new open match.
      this.selectedMatch = matchIndex;
    }
  }

  // Method to show the selected area. In case the button is already selected no operations will be execute.
  changeArea(areaIndex: number): void {
    // Operate only if the area is not selected yet.
    if (this.selectedArea !== areaIndex) {
      // Change status of the current area.
      // tslint:disable-next-line:max-line-length
      this.tournament.listDetailAreas[this.selectedMatch][this.selectedArea].isSelected = !this.tournament.listDetailAreas[
        this.selectedMatch
      ][this.selectedArea].isSelected;
      // Change status of the newly selected area.
      // tslint:disable-next-line:max-line-length
      this.tournament.listDetailAreas[this.selectedMatch][areaIndex].isSelected = !this.tournament.listDetailAreas[this.selectedMatch][
        areaIndex
      ].isSelected;
      this.selectedArea = areaIndex;
    }
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
