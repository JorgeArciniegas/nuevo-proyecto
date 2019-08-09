import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getColumnsGrid'
})
export class GetColumnsGridPipe implements PipeTransform {

  transform(numColumns: number): string {
    let columns = '*';
    for (let i = 0; i < numColumns; i++) {
      columns += ',*';
    }
    return columns;
  }

}
