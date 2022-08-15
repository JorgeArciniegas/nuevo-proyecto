import { AccountVirtualSport } from '@elys/elys-api';

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
	{
		SportId: 21,
		SportName: 'Roulette',
		VirtualCategories: [
			{
				Name: 'American Roulette',
				Code: 'ARLT'
			}
		]
	},
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