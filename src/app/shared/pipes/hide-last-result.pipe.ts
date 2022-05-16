import { ComponentFactoryResolver, Pipe, PipeTransform } from '@angular/core';
import { AmericanRouletteRug } from 'src/app/products/main/playable-board/templates/american-roulette/american-roulette.models';
import { EventsResultsWithDetails, layoutTypeWithDelay } from 'src/app/products/main/results/results.model';
import { ResultsService } from 'src/app/products/main/results/results.service';
import { LAYOUT_TYPE } from 'src/environments/environment.models';

@Pipe({
    name: 'hideLastResult'
})
export class HideLastResultPipe implements PipeTransform {
    private _americanRouletteRug: AmericanRouletteRug;
    constructor(private resultsService: ResultsService) {
        this._americanRouletteRug = new AmericanRouletteRug();
     }
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
            if (layoutType === LAYOUT_TYPE.AMERICANROULETTE && isDelayActive) {
                this.resultsService.eventsResultsDuringDelay.forEach(
                    res => { res.americanRouletteResults.color = this.getColorClass(res.americanRouletteResults.result) }
                );
            }
            return isDelayActive ? this.resultsService.eventsResultsDuringDelay : value;
        }
        return null;
    }

    isDelayExpired(countDown: number, layoutType: LAYOUT_TYPE): boolean {
        //sportDelay: fallback if not videoinfo is provided
        const sportDelay: number = layoutTypeWithDelay[layoutType];
        const videoDuration: number = this.resultsService.currentEventVideoDuration;
        const eventDuration: number = (videoDuration && videoDuration > 0) ? videoDuration : sportDelay;
        const timeSpanDelay: number = this.resultsService.nextEventDuration - eventDuration;
        console.log('timeSpanDelay', timeSpanDelay)
        return (countDown > timeSpanDelay);
    }
    private getColorClass(n: number | string): string {
        // tslint:disable-next-line:max-line-length
        return this._americanRouletteRug.red.includes(parseInt(n.toString(), 10)) ? 'red' : (this._americanRouletteRug.black.includes(parseInt(n.toString(), 10)) ? 'black' : 'green');
    }
}