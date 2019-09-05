import { VBoxConfigurations } from '@elys/elys-api';

export interface ListVbox {
  totalPages?: number;
  actualPages?: number;
  totalVboxs: number;
  vBoxConfigurations: VBoxConfigurations;
}
