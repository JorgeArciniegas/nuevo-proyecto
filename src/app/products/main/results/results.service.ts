import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElysApiService, EventResult, VideoMetadataVirtualVideoInfoRequest, VideoMetadataVirtualVideoInfoResponse, VirtualSportLastResultsRequest, VirtualSportLastResultsResponse } from '@elys/elys-api';
import { IVideoInfo } from '@elys/elys-api/lib/virtual-v2/interfaces/video-info.interface';
import { BehaviorSubject, timer } from 'rxjs';
import { HideLastResultPipe } from 'src/app/shared/pipes/hide-last-result.pipe';
import { environment } from 'src/environments/environment';
import { LAYOUT_TYPE } from '../../../../../src/environments/environment.models';
import { ProductsService } from '../../products.service';
import { EventTime } from '../main.models';
import { AmericanRouletteRug } from '../playable-board/templates/american-roulette/american-roulette.models';
import { Band, Colour } from '../playable-board/templates/colours/colours.models';
import { ColoursNumber, ColoursResult, EventsResultsWithDetails, LastResult, OVER_UNDER_COCKFIGHT, videoInfoDelay } from './results.model';

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
  private _currentEventVideoDuration: number;
  public get currentEventVideoDuration(): number {
    return this._currentEventVideoDuration;
  }
  private _americanRouletteRug: AmericanRouletteRug;
  eventsResultsDuringDelay: EventsResultsWithDetails[] = null;
  typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;

  constructor(
    private productService: ProductsService,
    private elysApi: ElysApiService,
    private http: HttpClient
    ) { 
      this._americanRouletteRug = new AmericanRouletteRug();
    }

  private _lastResults: LastResult = { eventResults: [], layoutType: undefined };
  public lastResultsSubject: BehaviorSubject<LastResult> = new BehaviorSubject<LastResult>(this._lastResults);
  getLastResult() {
    const request: VirtualSportLastResultsRequest = {
      SportId: this.productService.product.sportId,
      CategoryType: this.productService.product.codeProduct,
      MultiFeedType: this.productService.product.layoutProducts.multiFeedType
    };
    const tmpListResult: EventsResultsWithDetails[] = [];
    this.elysApi.virtual.getLastResult(request)
      .then((eventResults: VirtualSportLastResultsResponse) => {
        timer(videoInfoDelay).subscribe(()=>{
          this.getVideoInfo(eventResults.EventResults[0].EventId);
        })
        // results for products
        const resultItemsLength = this.productService.product.layoutProducts.resultItems;
        if (this.productService.product.layoutProducts.type !== LAYOUT_TYPE.SOCCER) {
          for (let i = 0; i < resultItemsLength; i++) {
            if (!eventResults.EventResults || !eventResults.EventResults[i]) {
              return;
            }
            // set the default parameters on the temporary EventResult
            tmpListResult.push(this.setResultByLayoutType(eventResults.EventResults[i]));
          }
        } else {
            if (eventResults.EventResults !== null) {
            // create last Result
            const tempEventResult: EventsResultsWithDetails = {
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
        this.eventsResultsDuringDelay = this.hideLastResult(eventResults);
        this.lastResultsSubject.next(this._lastResults);
      });
  }
  setResultByLayoutType(eventResults: EventResult,): EventsResultsWithDetails {
    const tempEventResult: EventsResultsWithDetails = {
      eventLabel: eventResults.EventName,
      eventNumber: eventResults.EventId
    };
    let results: string[] = [];
    switch (this.productService.product.layoutProducts.type) {
      case LAYOUT_TYPE.RACING:
        results = eventResults.Result.split('-');
        tempEventResult.racePodium = {
          firstPlace: Number.parseInt(results[0], 0),
          secondPlace: Number.parseInt(results[1], 0),
          thirdPlace: Number.parseInt(results[2], 0)
        };
        break;
      case LAYOUT_TYPE.COCK_FIGHT:
        results = eventResults.Result.split('-');
        tempEventResult.cockResult = {
          winner: Number.parseInt(results[0], 0),
          ou: results[1] as OVER_UNDER_COCKFIGHT,
          sector: Number.parseInt(results[2], 0),
        };
        break;
      case LAYOUT_TYPE.KENO:
        results = eventResults.Result.split(',');
        const kenoResults: number[] = results.map(result => Number.parseInt(result, 0));
        tempEventResult.kenoResults = kenoResults;
        break;
      case LAYOUT_TYPE.COLOURS:
        results = eventResults.Result.split(',');
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
        const resultNumber = eventResults.Result;
        tempEventResult.americanRouletteResults = {
          result: resultNumber,
          color: this.getAmericanRouletteColorClass(resultNumber)
        }
        break;
      default:
        break;
    }
    return tempEventResult;
  }


  /**
     * try to get video information, if api doesn't respond, it start to retry to call
     */
  private getVideoInfo(eventId: number, retryNumber: number = 0): void {
    const request: VideoMetadataVirtualVideoInfoRequest = {
      CategoryType:  this.productService.product.codeProduct,
      SportId: this.productService.product.sportId,
    }
    this.elysApi.virtualV2.getVideoInfo(
      this.productService.product.sportId,
      this.productService.product.codeProduct,
      eventId
    )
    .subscribe(
        (videoMetadataVirtualVideoInfoResponse: IVideoInfo) => {
          // check error from API response
          this._currentEventVideoDuration = this.checkVideoInfo(videoMetadataVirtualVideoInfoResponse) 
          ? videoMetadataVirtualVideoInfoResponse.VideoInfo.Video.Duration 
          : 0;
        }
      );
  }

  /**
   * checkVideoInfo check if video info response is empty due its server generation time
   * @param videoMetadataVirtualVideoInfoResponse video info response
   * @returns 
   */
  private checkVideoInfo(videoMetadataVirtualVideoInfoResponse: IVideoInfo): boolean {
    if (
      !videoMetadataVirtualVideoInfoResponse ||
      !videoMetadataVirtualVideoInfoResponse.VideoInfo ||
      !videoMetadataVirtualVideoInfoResponse.VideoUrls ||
      videoMetadataVirtualVideoInfoResponse.VideoUrls.length === 0
    ) return false;
    return true;
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

  /**
   * @param eventResults  all results from api
   * @returns EventsResultsWithDetails[] array of las results to show during delay period
   */
  hideLastResult(eventResults: VirtualSportLastResultsResponse): EventsResultsWithDetails[] {
    //Number of item to show as last result defined in environment
    const itemsToShow: number = this.productService.product.layoutProducts.resultItems;
    //Difference between items returned from api and itemsToShow
    const itemsExceeded = eventResults.EventResults.length - itemsToShow;
    const layoutType: LAYOUT_TYPE = this._lastResults.layoutType
    let currentEventsResults: EventsResultsWithDetails[] = [...this._lastResults.eventResults];
    let eventDuringDelay: EventsResultsWithDetails = null;
    if (itemsExceeded > 0 && layoutType !== LAYOUT_TYPE.SOCCER) {
      eventDuringDelay = this.setResultByLayoutType(eventResults.EventResults[itemsToShow]);
    } else {
      eventDuringDelay = this.soccerResultAvailableForDelay(itemsExceeded, itemsToShow, eventResults)
    }
    //Results array during delay is made by removing the actual last result and pushing the first available in the itemsExceeded
    currentEventsResults.splice(0, 1);
    currentEventsResults.push(eventDuringDelay);
    return currentEventsResults;
  }
  /**
   * 
   * @param itemsToShow number of item to show as last results defined in environment
   * @param itemsExceeded difference between items returned from api and itemsToShow
   * @param eventResults  all results from api
   * @returns EventsResultsWithDetails
   */
  soccerResultAvailableForDelay(itemsToShow: number, itemsExceeded: number, eventResults: VirtualSportLastResultsResponse): EventsResultsWithDetails {
    let eventDuringDelay: EventsResultsWithDetails;
    //Check if the items returned for soccer are a multiple of itemsToShow. 
    //That means there are more than 1 week as last results
    if (itemsExceeded > 0 && itemsExceeded % itemsToShow === 0) {
      eventDuringDelay = {
        eventLabel: eventResults.EventResults[itemsToShow].TournamentName,
        eventNumber: eventResults.EventResults[itemsToShow].TournamentId
      };
      eventDuringDelay.soccerResult = eventResults.EventResults.filter(item => item.TournamentId === eventDuringDelay.eventNumber);
    } else {
      eventDuringDelay = null;
    }
    return eventDuringDelay;
  }

  public getAmericanRouletteColorClass(n: number | string): string {
    return this._americanRouletteRug.red.includes(parseInt(n.toString(), 10))
     ? 'red'
     : (this._americanRouletteRug.black.includes(parseInt(n.toString(), 10)) 
     ? 'black' : 'green');
  }
}
