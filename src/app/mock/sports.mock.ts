import { AccountVirtualSport, VirtualProgramTreeBySportResponse, VirtualSportLastResultsResponse } from '@elys/elys-api';

export const mockTsMft: string = 'F2';

export const mockFirstEvId: number = 21254738;

export const mockFirstEvDuration: number = 120;

export const mockAccountVirtualSport: AccountVirtualSport[] = [
	{
		SportId: 8,
		SportName: 'DogRacing',
		VirtualCategories: [
			{
				Name: 'Dog Racing',
				Code: 'DOG'
			}
		]
	},
	{
		SportId: 10,
		SportName: 'HorseRacing',
		VirtualCategories: [
			{
				Name: 'Horse Racing',
				Code: 'HORSE'
			}
		]
	},
	{
		SportId: 210,
		SportName: 'VirtualHorse',
		VirtualCategories: [
			{
				Name: 'Virtual Horse',
				Code: 'HORSE-VIRT'
			}
		]
	},
	{
		SportId: 1,
		SportName: 'Soccer',
		VirtualCategories: [
			{
				Name: 'Italian League',
				Code: 'ITA-LEAGUE'
			},
			{
				Name: 'England League',
				Code: 'ENG-LEAGUE'
			}
		]
	},
	{
		SportId: 18,
		SportName: 'Keno',
		VirtualCategories: [
			{
				Name: 'Keno 80',
				Code: 'KENO'
			}
		]
	},
	{
		SportId: 20,
		SportName: 'CockRacing',
		VirtualCategories: [
			{
				Name: 'Cock Fighting',
				Code: 'COCK'
			}
		]
	},
	// {
	// 	SportId: 21,
	// 	SportName: 'Roulette',
	// 	VirtualCategories: [
	// 		{
	// 			Name: 'American Roulette',
	// 			Code: 'ARLT'
	// 		}
	// 	]
	// },
	{
		SportId: 24,
		SportName: 'Colors',
		VirtualCategories: [
			{
				Name: 'Colors',
				Code: 'CLRS'
			}
		]
	}
]

export const mockVirtualProgramTreeBySportResponse: VirtualProgramTreeBySportResponse = {
	'Sports': [
		{
			'id': 8,
			'nm': 'DogRacing',
			'ec': 1,
			'stc': 'DOG',
			'ts': [
				{
					'id': 21252205,
					'pn': null,
					'pid': 21252204,
					'nm': 'Tournament DogRacing',
					'sdt': '2022-08-18T06:00:00',
					'edt': new Date('2022-08-19T06:00:00'),
					'sdtoffset': new Date('2022-08-18T06:00:00+02:00'),
					'cdt': -138302951981,
					'ec': 12,
					'duration': 120,
					'mft': mockTsMft,
					'evs': [
						{
							'id': mockFirstEvId,
							'nm': 'Race n. 232',
							'mk': [],
							'sdt': '2022-08-18T09:51:00',
							'edt': new Date('2022-08-18T09:51:00'),
							'sdtoffset': new Date('2022-08-18T09:51:00+02:00'),
							'cdt': 297048009,
							'tm': [],
							'smc': 5746,
							'st': 1,
							'ehv': false,
							//'mft': 'F1:F2:F4:',
							'duration': mockFirstEvDuration
						},
						{
							'id': 21254748,
							'nm': 'Race n. 234',
							'mk': [],
							'sdt': '2022-08-18T09:53:00',
							'edt': new Date('2022-08-18T09:53:00'),
							'sdtoffset': new Date('2022-08-18T09:53:00+02:00'),
							'cdt': 1497048006,
							'tm': [],
							'smc': 5784,
							'st': 1,
							'ehv': false,
							//'mft': 'F1:F2:F3:F6:',
							'duration': 120
						},
						{
							'id': 21254750,
							'nm': 'Race n. 236',
							'mk': [],
							'sdt': '2022-08-18T09:55:00',
							'edt': new Date('2022-08-18T09:55:00'),
							'sdtoffset': new Date('2022-08-18T09:55:00+02:00'),
							'cdt': 2697048004,
							'tm': [],
							'smc': 5798,
							'st': 1,
							'ehv': false,
							//'mft': 'F1:F2:F4:',
							'duration': 120
						},
						{
							'id': 21254752,
							'nm': 'Race n. 238',
							'mk': [],
							'sdt': '2022-08-18T09:57:00',
							'edt': new Date('2022-08-18T09:57:00'),
							'sdtoffset': new Date('2022-08-18T09:57:00+02:00'),
							'cdt': 3897048002,
							'tm': [],
							'smc': 5812,
							'st': 1,
							'ehv': false,
							//'mft': 'F1:F2:',
							'duration': 120
						},
						{
							'id': 21254754,
							'nm': 'Race n. 240',
							'mk': [],
							'sdt': '2022-08-18T09:59:00',
							'edt': new Date('2022-08-18T09:59:00'),
							'sdtoffset': new Date('2022-08-18T09:59:00+02:00'),
							'cdt': 5097048001,
							'tm': [],
							'smc': 5826,
							'st': 1,
							'ehv': false,
							//'mft': 'F1:F2:F3:F4:F5:F6:',
							'duration': 120
						},
						{
							'id': 21254832,
							'nm': 'Race n. 242',
							'mk': [],
							'sdt': '2022-08-18T10:01:00',
							'edt': new Date('2022-08-18T10:01:00'),
							'sdtoffset': new Date('2022-08-18T10:01:00+02:00'),
							'cdt': 6297047999,
							'tm': [],
							'smc': 6142,
							'st': 1,
							'ehv': false,
							//'mft': 'F1:F2:',
							'duration': 120
						},
						{
							'id': 21254840,
							'nm': 'Race n. 244',
							'mk': [],
							'sdt': '2022-08-18T10:03:00',
							'edt': new Date('2022-08-18T10:03:00'),
							'sdtoffset': new Date('2022-08-18T10:03:00+02:00'),
							'cdt': 7497047997,
							'tm': [],
							'smc': 6174,
							'st': 1,
							'ehv': false,
							//'mft': 'F1:F2:F4:',
							'duration': 120
						},
						{
							'id': 21254842,
							'nm': 'Race n. 246',
							'mk': [],
							'sdt': '2022-08-18T10:05:00',
							'edt': new Date('2022-08-18T10:05:00'),
							'sdtoffset': new Date('2022-08-18T10:05:00+02:00'),
							'cdt': 8697047995,
							'tm': [],
							'smc': 6188,
							'st': 1,
							'ehv': false,
							//'mft': 'F1:F2:F3:F6:',
							'duration': 120
						},
						{
							'id': 21254844,
							'nm': 'Race n. 248',
							'mk': [],
							'sdt': '2022-08-18T10:07:00',
							'edt': new Date('2022-08-18T10:07:00'),
							'sdtoffset': new Date('2022-08-18T10:07:00+02:00'),
							'cdt': 9897047993,
							'tm': [],
							'smc': 6202,
							'st': 1,
							'ehv': false,
							//'mft': 'F1:F2:F4:',
							'duration': 120
						},
						{
							'id': 21254846,
							'nm': 'Race n. 250',
							'mk': [],
							'sdt': '2022-08-18T10:09:00',
							'edt': new Date('2022-08-18T10:09:00'),
							'sdtoffset': new Date('2022-08-18T10:09:00+02:00'),
							'cdt': 11097047991,
							'tm': [],
							'smc': 6216,
							'st': 1,
							'ehv': false,
							//'mft': 'F1:F2:F5:',
							'duration': 120
						},
						{
							'id': 21254942,
							'nm': 'Race n. 252',
							'mk': [],
							'sdt': '2022-08-18T10:11:00',
							'edt': new Date('2022-08-18T10:11:00'),
							'sdtoffset': new Date('2022-08-18T10:11:00+02:00'),
							'cdt': 12297047989,
							'tm': [],
							'smc': 6580,
							'st': 1,
							'ehv': false,
							//'mft': 'F1:F2:F3:F4:F6:',
							'duration': 120
						},
						{
							'id': 21254944,
							'nm': 'Race n. 254',
							'mk': [],
							'sdt': '2022-08-18T10:13:00',
							'edt': new Date('2022-08-18T10:13:00'),
							'sdtoffset': new Date('2022-08-18T10:13:00+02:00'),
							'cdt': 13497047987,
							'tm': [],
							'smc': 6594,
							'st': 1,
							'ehv': false,
							//'mft': 'F1:F2:',
							'duration': 120
						}
					]
				}
			]
		}
	]
}

export const mockVirtualSportLastResultsResponse: VirtualSportLastResultsResponse = {
	EventResults: [
		{
			EventId: 21254748,
			EventName: 'Race n. 234',
			TournamentId: 21252205,
			TournamentName: 'Tournament DogRacing',
			Result: '1-6-5'
		},
		{
			EventId: 21254738,
			EventName: 'Race n. 232',
			TournamentId: 21252205,
			TournamentName: 'Tournament DogRacing',
			Result: '4-1-6'
		},
		{
			EventId: 21254640,
			EventName: 'Race n. 230',
			TournamentId: 21252205,
			TournamentName: 'Tournament DogRacing',
			Result: '6-3-5'
		},
		{
			EventId: 21254638,
			EventName: 'Race n. 228',
			TournamentId: 21252205,
			TournamentName: 'Tournament DogRacing',
			Result: '3-4-1'
		},
		{
			EventId: 21254636,
			EventName: 'Race n. 226',
			TournamentId: 21252205,
			TournamentName: 'Tournament DogRacing',
			Result: '4-5-3'
		},
		{
			EventId: 21254634,
			EventName: 'Race n. 224',
			TournamentId: 21252205,
			TournamentName: 'Tournament DogRacing',
			Result: '1-4-6'
		},
		{
			EventId: 21254623,
			EventName: 'Race n. 222',
			TournamentId: 21252205,
			TournamentName: 'Tournament DogRacing',
			Result: '2-3-4'
		},
		{
			EventId: 21254530,
			EventName: 'Race n. 220',
			TournamentId: 21252205,
			TournamentName: 'Tournament DogRacing',
			Result: '6-3-2'
		},
		{
			EventId: 21254526,
			EventName: 'Race n. 218',
			TournamentId: 21252205,
			TournamentName: 'Tournament DogRacing',
			Result: '6-5-2'
		},
		{
			EventId: 21254513,
			EventName: 'Race n. 216',
			TournamentId: 21252205,
			TournamentName: 'Tournament DogRacing',
			Result: '2-6-3'
		},
		{
			EventId: 21254510,
			EventName: 'Race n. 214',
			TournamentId: 21252205,
			TournamentName: 'Tournament DogRacing',
			Result: '3-5-6'
		},
		{
			EventId: 21254508,
			EventName: 'Race n. 212',
			TournamentId: 21252205,
			TournamentName: 'Tournament DogRacing',
			Result: '4-5-2'
		}
	]
}
