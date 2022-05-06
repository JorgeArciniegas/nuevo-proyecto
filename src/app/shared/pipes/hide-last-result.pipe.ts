import { ComponentFactoryResolver, Pipe, PipeTransform } from '@angular/core';
import { EventsResultsWithDetails, layoutTypeWithDelay } from 'src/app/products/main/results/results.model';
import { ResultsService } from 'src/app/products/main/results/results.service';
import { LAYOUT_TYPE } from 'src/environments/environment.models';

@Pipe({
    name: 'hideLastResult'
})
export class HideLastResultPipe implements PipeTransform {
    constructor(private resultsService: ResultsService) { }
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
        const sportDelay: number = layoutTypeWithDelay[layoutType];
        const timeSpanDelay: number = this.resultsService.nextEventDuration - sportDelay;
        return (countDown > timeSpanDelay);

        //return (countDown <= this.resultsService.nextEventDuration);
    }

}