import { Pipe, PipeTransform } from '@angular/core';
import { Dog } from '../dogracing.models';

@Pipe({
  name: 'filterByPosition'
})
export class FilterByPositionPipe implements PipeTransform {
  transform(dog: Dog[], position?: number): Dog[] {
    return dog.filter(d => d.position === position);
  }
}