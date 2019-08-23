export class DataStaticsChart {
  CONDITION: number;
  ATTACK: number;
  DEFENCE: number;
  constructor(condition?: number, attack?: number, defence?: number) {
    this.CONDITION = condition || 0;
    this.ATTACK = attack || 0;
    this.DEFENCE = defence || 0;
  }
}
