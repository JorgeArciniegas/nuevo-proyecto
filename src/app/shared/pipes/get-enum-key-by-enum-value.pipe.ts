import { Pipe, PipeTransform } from '@angular/core';
import { TransactionType } from '../../admin/reports/transactions-list/transactions-list.model';

@Pipe({
  name: 'getEnumKeyByEnumValue'
})
export class GetEnumKeyByEnumValuePipe implements PipeTransform {
  transform(enumValue: TransactionType): string {
    return Object.keys(TransactionType).filter(x => TransactionType[x] === enumValue)[0];
  }
}
