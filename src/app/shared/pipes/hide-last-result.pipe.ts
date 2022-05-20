import { Pipe, PipeTransform } from '@angular/core';
import { defaultLayoutTypeDelay, EventsResultsWithDetails } from 'src/app/products/main/results/results.model';
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
            const isDelayActive: boolean = this.isDelayExpired(countDownInSeconds, layoutType);
            return isDelayActive ? this.resultsService.eventsResultsDuringDelay : value;
        }
        return null;
    }

    isDelayExpired(countDown: number, layoutType: LAYOUT_TYPE): boolean {
        //defaultDelay: fallback if not videoinfo from api is provided or if video duration is <= 0
        const defaultDelay: number = defaultLayoutTypeDelay[layoutType].videoLengthDurartion;
        // Video duration retrieved from video info api
        // Video duration is always 0 with Keno and Colours
        const videoDuration: number = this.resultsService.currentEventVideoDuration;
        console.log('video info manupulated duration', videoDuration);
        let currentEventDuration: number = (videoDuration && videoDuration > 0) ? videoDuration : defaultDelay;
        console.log('current event duration', currentEventDuration);
        // Calculate the time remaining between the end of current event and start of next event 
        const remainingTime: number = this.resultsService.nextEventDuration - currentEventDuration;
        console.log('show at second:', remainingTime);
        // If countdown is grater than remainingTime, means that current event is not finished yet and its results must be hidden
        return (countDown > remainingTime);
    }
    
}