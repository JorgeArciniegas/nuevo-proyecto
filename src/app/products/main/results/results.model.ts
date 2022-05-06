import { LAYOUT_TYPE } from '../../../../environments/environment.models';
import { Band, Colour } from '../playable-board/templates/colours/colours.models';

export class EventsResultsWithDetails {
  eventLabel: string;
  eventNumber: number;
  racePodium?: RacePodium;
  cockResult?: CockFightingResult;
  soccerResult?: SoccerResult[];
  kenoResults?: number[];
  coloursResults?: ColoursResult;
  americanRouletteResults?: AmericanRouletteResults;
}

export interface RacePodium {
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
}

export interface CockFightingResult {
  winner: number; // Winner 1 = RED, 2 = BLUE
  ou: OVER_UNDER_COCKFIGHT; // O / U
  sector: number; // Sector
}

export interface ColoursResult {
  numbersExtracted: ColoursNumber[];
  hiloWinningSelection: Band;
  hiloNumber: number;
}

export interface ColoursNumber {
  number: number;
  colour: Colour;
}

export interface SoccerResult {
  EventId: number;
  EventName: string;
  TournamentId: number;
  TournamentName: string;
  Result: string;
}

export enum OVER_UNDER_COCKFIGHT {
  O = 'ov',
  U = 'un'
}

export interface AmericanRouletteResults {
  result: string;
  color?: string;
}

export interface LastResult {
  eventResults: EventsResultsWithDetails[];
  layoutType: LAYOUT_TYPE;
}
export interface DelayLayoutDictonary{
  [key: number]:number;
}
export const layoutTypeWithDelay : DelayLayoutDictonary = {
  [LAYOUT_TYPE.AMERICANROULETTE] : 50,
  [LAYOUT_TYPE.COCK_FIGHT] : 60,
  [LAYOUT_TYPE.COLOURS]: 50,
  [LAYOUT_TYPE.KENO]: 50,
  [LAYOUT_TYPE.RACING]: 65,
  [LAYOUT_TYPE.SOCCER]: 140
}