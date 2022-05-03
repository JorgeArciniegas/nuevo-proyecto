import { Pipe, PipeTransform } from '@angular/core';
import { EventResultWithSport, layoutTypeWithDelay } from 'src/app/products/main/results/results.model';
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
    transform(value: EventResultWithSport[], layoutType: LAYOUT_TYPE, countDownInSeconds: number): EventResultWithSport[] {
        const isDelayActive: boolean = this.isDelayExpired(countDownInSeconds, layoutType);
        console.log("HideLastResultPipe : ",isDelayActive , " - valueLength :", value.length," - eventResultsLength : ",this.resultsService.eventsResultsDuringDelay.length  );
        
        return isDelayActive ? this.resultsService.eventsResultsDuringDelay : value;
    }


    isDelayExpired(countDown: number, layoutType: LAYOUT_TYPE): boolean {
        const sportDelay: number = layoutTypeWithDelay[layoutType];
        const timeSpanDelay: number = this.resultsService.nextEventDuration - sportDelay;
        return (countDown > timeSpanDelay);
    }

}