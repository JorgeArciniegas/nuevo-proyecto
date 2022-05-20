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

export const videoInfoDelay : number = 5000;
export interface VideoLenght{
  videoIntroLength: number;
  videoLength: number;
}
export interface DelayLayoutDictonary{
  [key: number]:VideoLenght;
}

export const defaultLayoutTypeDelay : DelayLayoutDictonary = {
  [LAYOUT_TYPE.AMERICANROULETTE] : {videoIntroLength: 5, videoLength: 50},
  [LAYOUT_TYPE.COCK_FIGHT] : {videoIntroLength: 5, videoLength: 60},
  [LAYOUT_TYPE.COLOURS]: {videoIntroLength: 5, videoLength: 50},
  [LAYOUT_TYPE.KENO]: {videoIntroLength: 5, videoLength: 50},
  [LAYOUT_TYPE.RACING]: {videoIntroLength: 5, videoLength: 65},
  [LAYOUT_TYPE.SOCCER]: {videoIntroLength: 5, videoLength: 140},
}
