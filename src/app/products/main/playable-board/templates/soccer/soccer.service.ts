import { Injectable, OnDestroy } from '@angular/core';
import { VirtualBetSelection } from '@elys/elys-api';
import { MainService } from '../../../main.service';
import { VirtualBetTournamentExtended } from '../../../main.models';
import { Subscription, timer } from 'rxjs';
import { BtncalcService } from '../../../../../component/btncalc/btncalc.service';
import { ElysCouponService } from '@elys/elys-coupon';
import { CouponService } from '../../../../../component/coupon/coupon.service';

@Injectable({
  providedIn: 'root'
})
export class SoccerService implements OnDestroy {
  public tournament: VirtualBetTournamentExtended;
  // Index of the match array of the selected match;
  public selectedMatch: number;
  // Index of the areas array of the selected match;
  public selectedArea: number;
  private currentEventSubscription: Subscription;
  private polyfunctionalAreaSubscription: Subscription;
  // Listen the coupon's change
  couponHasChangedSubscription: Subscription;
  couponHasBeenPlacedSubscription: Subscription;
  constructor(
    private mainService: MainService,
    private btnCalcService: BtncalcService,
    private elysCoupon: ElysCouponService,
    private couponService: CouponService
  ) {
    // Variables inizialization.
    this.selectedMatch = -1;
    // Set the default Area "Main".
    this.selectedArea = 0;

    // Get the event's detail at the access of the section
    this.getTournamentDetails();

    // Get the event's details.
    this.currentEventSubscription = this.mainService.currentEventObserve.subscribe(() => {
      this.getTournamentDetails();
    });

    // Remove selected odd when delete all Selection from coupon.
    this.couponHasBeenPlacedSubscription = this.couponService.couponHasBeenPlacedObs.subscribe(b => {
      if (b && this.tournament && this.tournament.matches) {
        this.tournament.matches.forEach(match => {
          if (match.hasOddsSelected) {
            match.hasOddsSelected = false;
            match.selectedOdds = [];
          }
        });
      }
    });

    // Get the change of the coupon's object.
    this.couponHasChangedSubscription = this.elysCoupon.couponHasChanged.subscribe(coupon => {
      if (coupon) {
        // There was a change on the coupon.
        this.tournament.matches.forEach(match => {
          match.selectedOdds.forEach((oddSelected, idx) => {
            let matchHasOdd = false;
            if (coupon.Odds.filter(odd => odd.SelectionId === oddSelected).length > 0) {
              matchHasOdd = true;
            }
            if (!matchHasOdd) {
              match.selectedOdds.splice(idx, 1);
              if (match.selectedOdds.length === 0) {
                match.hasOddsSelected = false;
              }
            }
          });
        });
      } else {
        // The coupon was removed.
        this.tournament.matches.map(match => {
          if (match.hasOddsSelected) {
            match.hasOddsSelected = false;
            match.selectedOdds = [];
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.currentEventSubscription.unsubscribe();
    this.polyfunctionalAreaSubscription.unsubscribe();
    this.couponHasChangedSubscription.unsubscribe();
    this.couponHasBeenPlacedSubscription.unsubscribe();
  }

  /**
   * Method to get the details of the currently selected tournament (week).
   * @param attemptsNumber The number of attempted call executed. Limit of attempts is 5 recall.
   */
  getTournamentDetails(attemptsNumber: number = 0): void {
    // Reset variables.
    // Reset the default Area to "Main".
    if (this.selectedArea !== 0) {
      this.changeArea(0);
    }
    // Deselect the match if any it is selected
    if (this.selectedMatch !== -1) {
      this.openEventDetails(this.selectedMatch);
    }

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
    // Reset the default Area to "Main".
    if (this.selectedArea !== 0) {
      this.changeArea(0);
    }
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

  selectOdd(matchIndex: number, marketId: number, selection: VirtualBetSelection): void {
    const selectedOdds = this.tournament.matches[matchIndex].selectedOdds;
    // Check if the match has already selected odds.
    if (selectedOdds.length > 0) {
      // The market is already present
      const oddIndex = selectedOdds.indexOf(selection.id);
      // Insert or delete the selection from the list of selected odds.
      if (oddIndex !== -1) {
        // It is a removal
        selectedOdds.splice(oddIndex, 1);
        if (selectedOdds.length === 0) {
          // If the match doesn't have any more selections change its "hasOddsSelected" status.
          this.tournament.matches[matchIndex].hasOddsSelected = !this.tournament.matches[matchIndex].hasOddsSelected;
        }
      } else {
        // It is an insertion
        selectedOdds.push(selection.id);
      }
    } else {
      // It is an insertion
      selectedOdds.push(selection.id);
      // Set the match as contening a selected odd.
      this.tournament.matches[matchIndex].hasOddsSelected = !this.tournament.matches[matchIndex].hasOddsSelected;
    }
    this.mainService.placingOddByOdd(marketId, selection);
    // tap su plus automatico
    this.btnCalcService.tapPlus();
  }
}
