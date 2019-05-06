import { Pipe, PipeTransform } from '@angular/core';
import { CouponOdd } from '@elys/elys-api';

@Pipe({name: 'groupByCategory'})
export class GroupByCategoryPipe implements PipeTransform {
    transform(collection: CouponOdd[], property: string): any {
        // prevents the application from breaking if the array of objects doesn't exist yet
        if (!collection) {
            return null;
        }
        console.log('groupByCategory', collection);
        const groupedCollection = collection.reduce((previous, current) => {
            let keyTmp: string = current[property] + ' - ' + current['EventName'];
            console.log('-------------', previous, current);
            if (!previous[keyTmp]) {
                previous[keyTmp] = [current];
            } else {
                previous[keyTmp].push(current);
            }

            return previous;
        }, {});

        // this will return an array of objects, each object containing a group of objects
        return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
    }
}
