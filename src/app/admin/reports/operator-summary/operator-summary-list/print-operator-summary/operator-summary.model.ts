import { ReportsOperatorVolumeResponse } from '@elys/elys-api';

export class OperatorSummary {
  operatorVolumes: ReportsOperatorVolumeResponse[];
  totalStake: number;
  totalVoided: number;
  totalWon: number;
  dateFrom: Date;
  dateTo: Date;

  constructor(operatorVolumes: ReportsOperatorVolumeResponse[], totalStake: number, totalVoided: number,
    totalWon: number, dateFrom: Date, dateTo: Date) {
    this.operatorVolumes = operatorVolumes;
    this.totalStake = totalStake;
    this.totalVoided = totalVoided;
    this.totalWon = totalWon;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
}
