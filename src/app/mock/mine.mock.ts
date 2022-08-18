import { EventDetail, EventInfo, EventTime } from '../products/main/main.models';

export const mockEventTime: EventTime = {
	minute: 1,
  	second: 30,
}

export const mockEventInfo: EventInfo[] = [
	{
		number: 1,
		label: 'event1',
		date: new Date('2022-07-11T11:42:17.93')
	},
	{
		number: 2,
		label: 'event2',
		date: new Date('2022-07-11T11:44:17.93')
	},
	{
		number: 3,
		label: 'event3',
		date: new Date('2022-07-11T11:46:17.93')
	},
]

export const mockEventDetail: EventDetail = {
	eventTime: mockEventTime,
	events: mockEventInfo,
	currentEvent: 0
}
