export class DataStaticsChart {
  STRENGTH: number;
  ENDURANCE: number;
  AGILITY: number;
  constructor(strength?: number, endurance?: number, agility?: number) {
    this.AGILITY = agility || 1;
    this.ENDURANCE = endurance || 1;
    this.STRENGTH = strength || 1;
  }
}
