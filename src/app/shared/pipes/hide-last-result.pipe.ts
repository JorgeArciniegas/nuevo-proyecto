import { Pipe, PipeTransform } from '@angular/core';
import { defaultEventDurationByLayoutType, EventsResultsWithDetails } from 'src/app/products/main/results/results.model';
import { ResultsService } from 'src/app/products/main/results/results.service';
import { LAYOUT_TYPE } from 'src/environments/environment.models';

@Pipe({
    name: 'hideLastResult'
})
export class HideLastResultPipe implements PipeTransform {
  
    constructor(private resultsService: ResultsService) {}
    /**
     * TODO DA FARE COMMENTO
     * @param value  
     * @param layoutType 
     * @param countDownInSeconds 
     * @returns
     */
    transform(value: EventsResultsWithDetails[], layoutType: LAYOUT_TYPE, countDownInSeconds: number): EventsResultsWithDetails[] {
        if (value) {
            const isDelayActive: boolean = this.isEventExpired(countDownInSeconds, layoutType);
            return isDelayActive ? this.resultsService.eventsResultsDuringDelay : value;
        }
        return null;
    }

    isEventExpired(countDown: number, layoutType: LAYOUT_TYPE): boolean {
        //defaultDelay: fallback if not videoinfo from api is provided or if video duration is <= 0
        const defaultEventDuration: number = defaultEventDurationByLayoutType[layoutType].videoLengthDuration;
        // Video duration retrieved from video info api
        // Video duration is always 0 with Keno and Colours
        const eventDuration: number = this.resultsService.currentEventVideoDuration;
        console.log('video info manupulated duration', eventDuration);
        let currentEventDuration: number = (eventDuration && eventDuration > 0) ? eventDuration : defaultEventDuration;
        console.log('current event duration', currentEventDuration);
        // Calculate the time remaining between the nextEvent duration (total cd from the beginning) and current event duration
        const timeToShowResult: number = this.resultsService.nextEventDuration - currentEventDuration;
        console.log('show at second:', timeToShowResult);
        // If countdown is grater than remainingTime, means that current event is not finished yet and its results must be hidden
        return (countDown > timeToShowResult);
    }
    
}