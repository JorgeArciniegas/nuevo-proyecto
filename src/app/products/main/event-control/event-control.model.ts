export class EventControl {
  productImageClass: string;
  productName: string;
  currentEvent: CurrentEvent;
  eventLabel: string;
  eventNumber: number;
  eventTimeMinutes?: number;
  eventTimeSeconds?: number;
  showEventId: boolean;
}

export interface CurrentEvent {
  number: number;
  label: string;
  date: Date;
}
