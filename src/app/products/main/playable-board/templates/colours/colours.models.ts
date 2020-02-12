import { ColourGameId } from '../../../colour-game.enum';

export interface ColourGame {
  name: string;
  id: ColourGameId;
}

export interface ColoursNumber {
  number: number;
  isSelected: boolean;
  colour: Colour;
  isDisabled: boolean;
}

export interface ColoursNumberNative extends ColoursNumber {
  row: number;
  col: number;
}

export enum Colour {
  RED,
  BLUE,
  GREEN,
  YELLOW
}

export interface ColoursSelection {
  band?: Band;
  name: string;
  interval?: string;
  isSelected: boolean;
  colour?: Colour;
}

export enum Band {
  LO = 'lo',
  MID = 'mid',
  HI = 'hi'
}
