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
  // Includes video intro + loading time for each video + video outro
  videoExtraDurartion: number;
  // videoLengthFallBack should be higher than average video lenght
  // to avoid to display the wrong result during the first 5 second 
  // after sport is selected, if the actual duration from api is higher
  videoLengthDurartion: number;
}
export interface DelayLayoutDictonary{
  [key: number]:VideoLenght;
}

export const defaultLayoutTypeDelay : DelayLayoutDictonary = {
  // videoExtraDurartion: 5 sec intro + 5 sec video loading + 5 sec outro
  [LAYOUT_TYPE.AMERICANROULETTE] : {videoExtraDurartion: 15, videoLengthDurartion: 50},
  [LAYOUT_TYPE.COCK_FIGHT] : {videoExtraDurartion: 20, videoLengthDurartion: 160},
  [LAYOUT_TYPE.COLOURS]: {videoExtraDurartion: 5, videoLengthDurartion: 15},
  [LAYOUT_TYPE.KENO]: {videoExtraDurartion: 5, videoLengthDurartion: 40},
   // videoExtraDurartion: 10 sec intro + 5 sec video loading + 5 sec outro
  [LAYOUT_TYPE.RACING]: {videoExtraDurartion: 20, videoLengthDurartion: 90},
  // videoExtraDurartion 20 sec intro + 25 sec video loading (3 sec * 8 video ) + 5 sec outro
  [LAYOUT_TYPE.SOCCER]: {videoExtraDurartion: 50, videoLengthDurartion: 140},
}
