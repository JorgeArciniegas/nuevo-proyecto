import { Pipe, PipeTransform } from '@angular/core';
import { Runner } from '../main.models';

@Pipe({
  name: 'filterByPosition'
})
export class FilterByPositionPipe implements PipeTransform {
  transform(runner: Runner[], position?: number): Runner[] {
    return runner.filter(d => d.position === position);
  }
}
