import { Band, Colour } from '../playable-board/templates/colours/colours.models';

export class EventResult {
  eventLabel: string;
  eventNumber: number;
  racePodium?: RacePodium;
  cockResult?: CockFightingResult;
  soccerResult?: SoccerResult[];
  kenoResults?: number[];
  coloursResults?: ColoursResult;
  americanRouletteResults?: string[];
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
