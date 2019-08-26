import { Operator } from '@elys/elys-api';

export interface DataListOfOperators {
  totalPages?: number;
  actualPages?: number;
  operators: Operator[];
}
