import { Injectable } from '@angular/core';
import { ElysApiService, VirtualSportLastResultsRequest, VirtualSportLastResultsResponse } from '@elys/elys-api';
import { timer } from 'rxjs';
import { LAYOUT_TYPE } from '../../../../../src/environments/environment.models';
import { ProductsService } from '../../products.service';
import { EventResult } from './results.model';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  private _listResult: EventResult[];
  typeLayout: typeof LAYOUT_TYPE = LAYOUT_TYPE;
  constructor(
    private productService: ProductsService,
    private elysApi: ElysApiService
    ) { }

  public get listResult(): EventResult[] {
    return this._listResult;
  }
  public set listResult(value: EventResult[]) {
    this._listResult = value;
  }

  getLastResult() {

    const request: VirtualSportLastResultsRequest = {
      SportId: this.productService.product.sportId,
      CategoryType: this.productService.product.codeProduct
    };
    this.listResult = [];
    timer(300).subscribe(() => {
      this.elysApi.virtual.getLastResult(request)
        .then((eventResults: VirtualSportLastResultsResponse) => {

          for (let i = 0; i < this.productService.product.layoutProducts.resultItems; i++) {
            const results: string[] = eventResults.EventResults[i].Result.split(
              '-'
            );
            // set the default parameters on the temporary EventResult
            const tempEventResult: EventResult = {
              eventLabel: eventResults.EventResults[i].EventName,
              eventNumber: eventResults.EventResults[i].EventId
            };
            // finds and set sport's result
            switch (this.productService.product.layoutProducts.type) {
              case LAYOUT_TYPE.RACING:
                tempEventResult.racePodium = {
                  firstPlace: Number.parseInt(results[0]),
                  secondPlace: Number.parseInt(results[1]),
                  thirdPlace: Number.parseInt(results[2])
                };
                break;
              case  LAYOUT_TYPE.COCK_FIGHT:
                tempEventResult.cockResult = {
                  winner: Number.parseInt(results[0]),
                  ou: results[1],
                  sector: Number.parseInt(results[2]),
                };
                break;
              case LAYOUT_TYPE.SOCCER:
              default:
                break;

            }
            // put the new object on the global list results
            this.listResult.push(tempEventResult);
          }
        });
    });
  }



  loadLastResult(delay: boolean = true): void {
    if (delay) {
      timer(10000).subscribe(() => this.getLastResult());
    } else {
      this.getLastResult();
    }
  }

}
