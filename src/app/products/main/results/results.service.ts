import { Injectable } from '@angular/core';
import { ElysApiService, VirtualSportLastResultsRequest, VirtualSportLastResultsResponse } from '@elys/elys-api';
import { BehaviorSubject, of } from 'rxjs';
import { HideLastResultPipe } from 'src/app/shared/pipes/hide-last-result.pipe';
import { LAYOUT_TYPE } from '../../../../../src/environments/environment.models';
import { ProductsService } from '../../products.service';
import { EventTime } from '../main.models';
import { Band, Colour } from '../playable-board/templates/colours/colours.models';
import { ColoursNumber, ColoursResult, EventResult, LastResult, layoutTypeWithDelay, OVER_UNDER_COCKFIGHT } from './results.model';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private _countDown: EventTime;
  public get countDown() {
    return this._countDown;
  }
  public set countDown(evtTime: EventTime) {
    this._countDown = evtTime;
  }
  private _nextEventDuration: number;
  public get nextEventDuration() {
    return this._nextEventDuration;
  }
  public set nextEventDuration(duration: number) {
    this._nextEventDuration = duration;
  }
  public get countDownInSeconds(): number {
    if (this.countDown) {
      return this.countDown.minute * 60 + this.countDown.second;
    }
    return 0;
  }

  typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;
public itemToShowDuringDelay: EventResult;


  constructor(
    private productService: ProductsService,
    private elysApi: ElysApiService,
    private _hideLastResult: HideLastResultPipe
  ) {}

  private _lastResults: LastResult = { eventResults: [], layoutType: undefined };
  public lastResultsSubject: BehaviorSubject<LastResult> = new BehaviorSubject<LastResult>(this._lastResults);
  getLastResult() {
    this.itemToShowDuringDelay = null;
    // this.lastResultsSubject.next({eventResults: [], layoutType: undefined});
    const request: VirtualSportLastResultsRequest = {
      SportId: this.productService.product.sportId,
      CategoryType: this.productService.product.codeProduct,
      MultiFeedType: this.productService.product.layoutProducts.multiFeedType
    };
    const tmpListResult: EventResult[] = [];
    this.elysApi.virtual.getLastResult(request)
      .then((eventResults: VirtualSportLastResultsResponse) => {
        // results for products
        const resultItemsLength = this.productService.product.layoutProducts.resultItems;
        //Difference between last result length form api e last result length defined in env
        const itemsExceeded: number = eventResults.EventResults.length - resultItemsLength;
        if (this.productService.product.layoutProducts.type !== LAYOUT_TYPE.SOCCER) {
          //If  
          this.itemToShowDuringDelay = itemsExceeded > 0 ?
          this.setResultByLayoutType(eventResults, resultItemsLength + 1) :
          null;

          // const eventsResultsDuringDelay: EventResult[] = Object.assign([], eventResults);
          // eventsResultsDuringDelay.shift();
          // eventsResultsDuringDelay.push(this.itemToShowDuringDelay);

          for (let i = 0; i < resultItemsLength; i++) {
            if (!eventResults.EventResults || !eventResults.EventResults[i]) {
              return;
            }
            // set the default parameters on the temporary EventResult
            tmpListResult.push(this.setResultByLayoutType(eventResults, i));
          }
        } else {
          if (eventResults.EventResults !== null) {
            // create last Result
            const tempEventResult: EventResult = {
              eventLabel: eventResults.EventResults[0].TournamentName,
              eventNumber: eventResults.EventResults[0].TournamentId
            };
            // group by last Tournament
            tempEventResult.soccerResult = eventResults.EventResults.filter(item => item.TournamentId === tempEventResult.eventNumber);
            tmpListResult.push(tempEventResult);
          }
        }
        this._lastResults.layoutType = this.productService.product.layoutProducts.type;
        this._lastResults.eventResults = tmpListResult;
        this.lastResultsSubject.next(this._lastResults);
      });
  }
  setResultByLayoutType(eventResults: VirtualSportLastResultsResponse, i: number): EventResult{
    const tempEventResult: EventResult = {
      eventLabel: eventResults.EventResults[i].EventName,
      eventNumber: eventResults.EventResults[i].EventId
    };
    let results: string[] = [];
    switch (this.productService.product.layoutProducts.type) {
      case LAYOUT_TYPE.RACING:
        results = eventResults.EventResults[i].Result.split('-');
        tempEventResult.racePodium = {
          firstPlace: Number.parseInt(results[0], 0),
          secondPlace: Number.parseInt(results[1], 0),
          thirdPlace: Number.parseInt(results[2], 0)
        };
        break;
      case LAYOUT_TYPE.COCK_FIGHT:
        results = eventResults.EventResults[i].Result.split('-');
        tempEventResult.cockResult = {
          winner: Number.parseInt(results[0], 0),
          ou: results[1] as OVER_UNDER_COCKFIGHT,
          sector: Number.parseInt(results[2], 0),
        };
        break;
      case LAYOUT_TYPE.KENO:
        results = eventResults.EventResults[i].Result.split(',');
        const kenoResults: number[] = results.map(result => Number.parseInt(result, 0));
        tempEventResult.kenoResults = kenoResults;
        break;
      case LAYOUT_TYPE.COLOURS:
        results = eventResults.EventResults[i].Result.split(',');
        const coloursNumbers: ColoursNumber[] = [];
        const numbersExtracted: number[] = results.map(result => Number.parseInt(result, 0));
        for (const numberExtracted of numbersExtracted) {
          const coloursNumber: ColoursNumber = {
            number: numberExtracted,
            colour: this.checkNumberColour(numberExtracted)
          };
          coloursNumbers.push(coloursNumber);
        }
        const hiloNumber: number = numbersExtracted.reduce((a, b) => a + b, 0);
        let hiloWinningSelection: Band;
        if (hiloNumber >= 21 && hiloNumber <= 148) {
          hiloWinningSelection = Band.LO;
        } else if (hiloNumber >= 149 && hiloNumber <= 151) {
          hiloWinningSelection = Band.MID;
        } else {
          hiloWinningSelection = Band.HI;
        }
        const coloursResult: ColoursResult = {
          numbersExtracted: coloursNumbers,
          hiloWinningSelection: hiloWinningSelection,
          hiloNumber: hiloNumber
        };
        tempEventResult.coloursResults = coloursResult;
        break;
      case LAYOUT_TYPE.AMERICANROULETTE:
        const resultNumber = eventResults.EventResults[i].Result;
          tempEventResult.americanRouletteResults = {
            result: resultNumber,
            color: ''
          }
        break;
      default:
        break;
    }
return tempEventResult;
  }
  private checkNumberColour(colourNumber: number): Colour {
    if (colourNumber === 49) {
      return Colour.YELLOW;
    }
    if (colourNumber % 3 === 1) {
      return Colour.RED;
    }
    if (colourNumber % 3 === 2) {
      return Colour.BLUE;
    }
    if (colourNumber % 3 === 0) {
      return Colour.GREEN;
    }
  }

}
