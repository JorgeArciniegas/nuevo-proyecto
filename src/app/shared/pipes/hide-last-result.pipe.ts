import { Pipe, PipeTransform } from '@angular/core';
import { LAYOUT_TYPE } from '../../../environments/environment.models';
import { defaultEventDurationByLayoutType, EventsResultsWithDetails } from '../../products/main/results/results.model';
import { ResultsService } from '../../products/main/results/results.service';

@Pipe({
  name: 'hideLastResult'
})
/**
 * Show/Hide last results based countDownInSeconds
 * If countdown is greater than remainingTime, means that current event is not finished yet and its results must be hidden
 */
export class HideLastResultPipe implements PipeTransform {

  constructor(private resultsService: ResultsService) { }
  transform(eventResultsWithDetails: EventsResultsWithDetails[], countDownInSeconds: number): EventsResultsWithDetails[] {
    if (eventResultsWithDetails?.length > 0) {
        const isDelayActive: boolean = this.isDelayActive(countDownInSeconds, this.resultsService.layoutType, eventResultsWithDetails[0].eventNumber);
        eventResultsWithDetails[0].show = isDelayActive ? false : true;
        eventResultsWithDetails[eventResultsWithDetails.length - 1].show = !eventResultsWithDetails[0].show;
        return eventResultsWithDetails.filter((v) => v.show);
    }
    return null;
  }

  /**
  * Used for manage rematingTime countdown
  * @param countDown
  * @param layoutType
  * @returns
  */
  isDelayActive(countDown: number, layoutType: LAYOUT_TYPE, eventNumber: number): boolean {
    const defaultEventDuration: number = defaultEventDurationByLayoutType[layoutType].videoLengthDuration; //security fallback
    // Video duration retrieved from video info api (always 0 with Keno and Colours )
    const eventDuration: number = this.resultsService.currentEventVideoDuration;
    let currentEventDuration: number = (eventDuration && eventDuration > 0) ? eventDuration : defaultEventDuration;
    // Calculate the time remaining between the nextEvent duration (total cd from the beginning) and current event duration
    const timeToShowResult: number = this.resultsService.nextEventDuration - currentEventDuration;
    // Check if the first last-result id is equal to next event id.
    let isNewResultBeforeCountDownExpiration: boolean = this.resultsService.nextEventNumber === eventNumber;
    // Last result's api is available with fresh result few seconds before CD expiration,
    // so we need to check it when current event is over and CD is not expired (when landing on a product few seconds from CD expiration)
    return (countDown > timeToShowResult || (countDown < timeToShowResult) && isNewResultBeforeCountDownExpiration);
  }

}
