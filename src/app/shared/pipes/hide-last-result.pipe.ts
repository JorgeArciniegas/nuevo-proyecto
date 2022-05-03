import { Pipe, PipeTransform } from '@angular/core';
import { EventResult, layoutTypeWithDelay } from 'src/app/products/main/results/results.model';
import { ResultsService } from 'src/app/products/main/results/results.service';
import { LAYOUT_TYPE } from 'src/environments/environment.models';

@Pipe({
    name: 'hideLastResult'
})
export class HideLastResultPipe implements PipeTransform {
    constructor(private resultsService: ResultsService) { }
    /**
     * Hide last result event  
     * @param value : EventResult[] all last results from api
     * @param layoutType : RACING, FIGHT, SOCCER ...
     * @param countDownInSeconds : Contdown for the next event in selected sport
     * @returns 
     */
    transform(value: EventResult[], layoutType: LAYOUT_TYPE, countDownInSeconds: number): EventResult[] {
        if (value) {
            const eventsResultsDuringDelay: EventResult[] = Object.assign([], value);
            const isDelayActive: boolean = this.isDelayExpired(countDownInSeconds, layoutType);
            if (isDelayActive) {
                eventsResultsDuringDelay.shift();
                eventsResultsDuringDelay.push(this.resultsService.itemToShowDuringDelay)
            }
            console.log('eventsResultsDuringDelay',eventsResultsDuringDelay);
            console.log('eventsResults',value);
            return isDelayActive ? eventsResultsDuringDelay : value;
        }
        return null;
    }


    isDelayExpired(countDown: number, layoutType: LAYOUT_TYPE): boolean {
        const sportDelay: number = layoutTypeWithDelay[layoutType];
        const timeSpanDelay: number = this.resultsService.nextEventDuration - sportDelay;
        return (countDown > timeSpanDelay);
    }

}