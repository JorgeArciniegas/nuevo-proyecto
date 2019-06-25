
export class EventResult {
  eventLabel: string;
  eventNumber: number;
  racePodium?: RacePodium;
  cockResult?: CockFightingResult;
  soccerResult?: SoccerResult;
}


export interface RacePodium {
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
}

export interface CockFightingResult {
  winner: number; // Winner 1 = RED, 2 = BLUE
  ou: string; // OVER / UNDER
  sector: number; // Sector
}

export interface SoccerResult {
  finalTime: string;
}
