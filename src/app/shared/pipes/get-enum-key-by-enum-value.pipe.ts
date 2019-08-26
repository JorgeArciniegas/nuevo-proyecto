import { Pipe, PipeTransform } from '@angular/core';
import { TransactionCategory } from '../../admin/reports/transactions-list/transactions-list.model';

@Pipe({
  name: 'getEnumKeyByEnumValue'
})
export class GetEnumKeyByEnumValuePipe implements PipeTransform {
  transform(enumValue: TransactionCategory): string {
    return Object.keys(TransactionCategory).filter(x => TransactionCategory[x] === enumValue)[0];
  }
}
