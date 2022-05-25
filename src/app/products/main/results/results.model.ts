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
  videoExtraDuration: number;
  // videoLengthFallBack should be higher than average video lenght
  // to avoid to display the wrong result during the first 5 second 
  // after sport is selected, if the actual duration from api is higher
  videoLengthDuration: number;
}
export interface DelayLayoutDictonary{
  [key: number]:VideoLenght;
}

export const defaultEventDurationByLayoutType : DelayLayoutDictonary = {
  // videoExtraDurartion: 5 sec intro + 5 sec video loading + 5 sec outro
  [LAYOUT_TYPE.AMERICANROULETTE] : {videoExtraDuration: 15, videoLengthDuration: 50},
  [LAYOUT_TYPE.COCK_FIGHT] : {videoExtraDuration: 20, videoLengthDuration: 160},
  [LAYOUT_TYPE.COLOURS]: {videoExtraDuration: 5, videoLengthDuration: 15},
  [LAYOUT_TYPE.KENO]: {videoExtraDuration: 5, videoLengthDuration: 40},
   // videoExtraDurartion: 10 sec intro + 5 sec video loading + 5 sec outro
  [LAYOUT_TYPE.RACING]: {videoExtraDuration: 20, videoLengthDuration: 105},
  // videoExtraDurartion 20 sec intro + 25 sec video loading (3 sec * 8 video ) + 5 sec outro
  [LAYOUT_TYPE.SOCCER]: {videoExtraDuration: 50, videoLengthDuration: 140},
}
