import { Pipe, PipeTransform } from '@angular/core';
import { defaultEventDurationByLayoutType, EventsResultsWithDetails } from 'src/app/products/main/results/results.model';
import { ResultsService } from 'src/app/products/main/results/results.service';
import { LAYOUT_TYPE } from 'src/environments/environment.models';

@Pipe({
    name: 'hideLastResult'
})
export class HideLastResultPipe implements PipeTransform {

    constructor(private resultsService: ResultsService) { }
    /**
     * @param value  array of last result from api
     * @param layoutType 
     * @param countDownInSeconds 
     * @returns
     */
    transform(value: EventsResultsWithDetails[], layoutType: LAYOUT_TYPE, countDownInSeconds: number): EventsResultsWithDetails[] {
        if (value && value.length > 0) {
            const isDelayActive: boolean = this.isEventExpired(countDownInSeconds, layoutType);
            value[0].show = isDelayActive ? false : true;
            //Soccer needs to be divided by 10 due 1 week contains 10 results
            const itemsToShow: number = (layoutType === LAYOUT_TYPE.SOCCER)
            ? this.resultsService.resultItemsLength / 10
            : this.resultsService.resultItemsLength
            return value.filter((v) => v.show).slice(0, itemsToShow);
        }
        return null;
    }

    isEventExpired(countDown: number, layoutType: LAYOUT_TYPE): boolean {
        //defaultDelay: fallback if not videoinfo from api is provided or if video duration is <= 0
        const defaultEventDuration: number = defaultEventDurationByLayoutType[layoutType].videoLengthDuration;
        // Video duration retrieved from video info api
        // Video duration is always 0 with Keno and Colours
        const eventDuration: number = this.resultsService.currentEventVideoDuration;
        let currentEventDuration: number = (eventDuration && eventDuration > 0) ? eventDuration : defaultEventDuration;
        // Calculate the time remaining between the nextEvent duration (total cd from the beginning) and current event duration
        const timeToShowResult: number = this.resultsService.nextEventDuration - currentEventDuration;
        // If countdown is greater than remainingTime, means that current event is not finished yet and its results must be hidden
        return (countDown > timeToShowResult);
    }

}