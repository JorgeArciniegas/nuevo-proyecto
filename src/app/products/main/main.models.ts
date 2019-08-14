import { VirtualBetSelection } from '@elys/elys-api';
import { markParentViewsForCheckProjectedViews } from '@angular/core/src/view/util';

export enum TypePlacingEvent {
  ST = 0,
  ACCG = 1,
  R = 2
}

export enum SpecialBet {
  EVEN = 0,
  ODD = 1,
  OVER = 2,
  UNDER = 3
}
export enum SpecialBetValue {
  '2-4-6' = 0,
  '1-3-5' = 1,
  '4-5-6' = 2,
  '1-2-3' = 3
}

export enum Podium {
  WINNER = 1,
  PLACED = 2,
  SHOW = 3
}

export enum SmartCodeType {
  V = 1,
  '2P',
  '3P',
  AO,
  AS,
  UP,
  OP,
  DP,
  PP,
  T,
  TOX,
  TNX, // Trifecta
  TR, // multiple selezione Trio in ordine con ritorno
  VX,
  AX,
  ASX,
  AOX,
  '1PX',
  '1VA',
  AB, // Quinella with base and tail
  VT, // Winning trio
  AR, // Quinella in order with return
  AT, // Combined trio
  S, // Sector
  OU, // Over/Under
  MULTI // Multiple selections
}

// Enum of the type of combinations available.
export enum CombinationType {
  By2, // Combination by 2. Ex: 1234 -> 1-2, 1-3, 1-4, 2-1, 2-3, 2-4 ecc.
  By3 // Combination by 3. Ex: 1234 -> 1-2-3, 1-3-4, 1-2-4, 2-1-3, 2-3-4, 3-1-2 ecc.
}

export enum TypeBetSlipColTot {
  COL,
  TOT
}

export class PlacingEvent {
  eventNumber: number;
  typePlace: TypePlacingEvent;
  secondRowDisabled: boolean;
  thirdRowDisabled: boolean;
  players: Player[];
  odds: VirtualBetSelectionExtended[];
  amount: number;
  repeat: number;
  isSpecialBets: boolean;
  specialBetValue: SpecialBet;
  timeBlocked: boolean;
  smartcode?: SmartCodeType;
  constructor() {
    this.eventNumber = 0;
    this.repeat = 1;
    this.amount = 0;
    this.isSpecialBets = false;
    this.players = [];
    this.odds = [];
    this.secondRowDisabled = false;
    this.thirdRowDisabled = false;
    // this.dogs = new Dog();
  }
}

export class Player {
  number: number;
  selectable: boolean;
  actived: boolean;
  position: number;
  constructor() {
    this.number = 0;
    this.selectable = true;
    this.actived = false;
    this.position = 0;
  }
}

export interface VirtualBetSelectionExtended extends VirtualBetSelection {
  marketId?: number;
}

export class EventTime {
  minute: number;
  second: number;
}

export class EventInfo {
  number: number;
  label: string;
  date: Date;
}

export class EventDetail {
  constructor(eventsToShow: number) {
    this.eventTime = new EventTime();
    this.events = new Array(eventsToShow);
    this.currentEvent = 0;
  }
  eventTime: EventTime;
  events: EventInfo[];
  currentEvent: number;
}

export class Smartcode {
  code: string;
  selWinner: number[];
  selPlaced: number[];
  selPodium: number[];
  constructor(win: number[] = [], placed: number[] = [], podium: number[] = []) {
    this.selPlaced = placed;
    this.selPodium = podium;
    this.selWinner = win;
  }
}
