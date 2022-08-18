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

// export const mockProduct = {
// 	"sportId": 8,
// 	"codeProduct": "DOG",
// 	"name": "DogRacing",
// 	"label": "DOG",
// 	"order": 0,
// 	"productSelected": true,
// 	"isPlayable": true,
// 	"layoutProducts": {
// 	  "type": 0,
// 	  "resultItems": 4,
// 	  "nextEventItems": 5,
// 	  "cacheEventsItem": 10,
// 	  "multiFeedType": "F2"
// 	},
// 	"toolbarButton": {
// 	  "name": "dogracing",
// 	  "icon": "Dog",
// 	  "route": "products/racing"
// 	},
// 	"widgets": [
// 	  {
// 		"name": "",
// 		"routing": "statistic",
// 		"typeLink": 0,
// 		"icon": "baseline-assessment-24px"
// 	  }
// 	],
// 	"typeCoupon": {
// 	  "isMultipleStake": true,
// 	  "acceptMultiStake": true,
// 	  "typeLayout": 0
// 	}
// }
