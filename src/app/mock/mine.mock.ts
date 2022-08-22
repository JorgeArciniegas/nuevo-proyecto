import { VirtualGetRankByEventResponse } from '@elys/elys-api';
import { EventDetail, EventInfo, EventTime } from '../products/main/main.models';

export const mockCountDown: number = 1000000000;

export const mockEventTime: EventTime = {
	minute: 1,
  	second: 2,
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

export const mockPlayerList = [
	{
	  number: 1,
	  selectable: true,
	  actived: false,
	  position: 1
	},
	{
	  number: 2,
	  selectable: true,
	  actived: false,
	  position: 1
	},
	{
	  number: 3,
	  selectable: true,
	  actived: false,
	  position: 1
	},
	{
	  number: 4,
	  selectable: true,
	  actived: false,
	  position: 1
	},
	{
	  number: 5,
	  selectable: true,
	  actived: false,
	  position: 1
	},
	{
	  number: 6,
	  selectable: true,
	  actived: false,
	  position: 1
	},
	{
	  number: 1,
	  selectable: true,
	  actived: false,
	  position: 2
	},
	{
	  number: 2,
	  selectable: true,
	  actived: false,
	  position: 2
	},
	{
	  number: 3,
	  selectable: true,
	  actived: false,
	  position: 2
	},
	{
	  number: 4,
	  selectable: true,
	  actived: false,
	  position: 2
	},
	{
	  number: 5,
	  selectable: true,
	  actived: false,
	  position: 2
	},
	{
	  number: 6,
	  selectable: true,
	  actived: false,
	  position: 2
	},
	{
	  number: 1,
	  selectable: true,
	  actived: false,
	  position: 3
	},
	{
	  number: 2,
	  selectable: true,
	  actived: false,
	  position: 3
	},
	{
	  number: 3,
	  selectable: true,
	  actived: false,
	  position: 3
	},
	{
	  number: 4,
	  selectable: true,
	  actived: false,
	  position: 3
	},
	{
	  number: 5,
	  selectable: true,
	  actived: false,
	  position: 3
	},
	{
	  number: 6,
	  selectable: true,
	  actived: false,
	  position: 3
	}
]

export const mockVirtualGetRankByEventResponse: VirtualGetRankByEventResponse = {
	RankRows: [
		{
			Competitor: {
				id: 3553,
				nm: 'INT',
				ito: 1
			},
			RankColumns: [
				{
					RankColumnKey: 'GOALS',
					RankColumnValue: '55'
				},
				{
					RankColumnKey: 'GOALSCON',
					RankColumnValue: '24'
				},
				{
					RankColumnKey: 'LASTRESULTS',
					RankColumnValue: 'P,V,V,N,V',
				},
				{
					RankColumnKey: 'POINTS',
					RankColumnValue: '55'
				},
				{
					RankColumnKey: 'POSTREND',
					RankColumnValue: '0'
				},
				{
					RankColumnKey: 'ROUND',
					RankColumnValue: '26'
				}
			]
		}
	]
}
