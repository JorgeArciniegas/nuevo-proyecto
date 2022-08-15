import { CouponLimitHierarchy, CurrencyCodeResponse } from '@elys/elys-api';

export const mockCouponLimit: CouponLimitHierarchy[] = [
	{
		Product: 'P',
		UserType: 2,
		CouponLimit: null
	},
	{
		Product: 'P',
		UserType: 3,
		CouponLimit: null
	},
	{
		Product: 'V',
		UserType: 2,
		CouponLimit: {
			MinBetStake: 0.5,
			MaxBetStake: 100,
			MaxSingleBetWin: 5000,
			MaxMultipleBetWin: 5000,
			MaxCombinationBetWin: 5000,
			MaxCouponOdds: 120,
			MaxCouponEvents: 999,
			MinBonusOdd: 1.18,
			MaxCouponCombinations: 200,
			MinGroupingsBetStake: 0.05,
			MaxGroupingsBetStake: 100,
			MaxCombinationsByGrouping: 100000,
			MaxCombinationsByCoupon: 9999999,
			MinCombinationBetRate: 0,
			IsDiscreteRateForSingleAndMultipleBets: false,
			ApplyMultipleBetWinLimitOnEachCombination: false,
			ListIdCurrencyCouponGlobalVariable: null
		}
	},
	{
		Product: 'V',
		UserType: 3,
		CouponLimit: {
			MinBetStake: 0.5,
			MaxBetStake: 100,
			MaxSingleBetWin: 5000,
			MaxMultipleBetWin: 5000,
			MaxCombinationBetWin: 5000,
			MaxCouponOdds: 120,
			MaxCouponEvents: 999,
			MinBonusOdd: 1.18,
			MaxCouponCombinations: 200,
			MinGroupingsBetStake: 0.05,
			MaxGroupingsBetStake: 100,
			MaxCombinationsByGrouping: 100000,
			MaxCombinationsByCoupon: 9999999,
			MinCombinationBetRate: 0,
			IsDiscreteRateForSingleAndMultipleBets: false,
			ApplyMultipleBetWinLimitOnEachCombination: false,
			ListIdCurrencyCouponGlobalVariable: null
		}
	},
	{
		Product: 'L',
		UserType: 2,
		CouponLimit: null
	},
	{
		Product: 'L',
		UserType: 3,
		CouponLimit: null
	}
]

export const mockCurrencyCodeResponse: CurrencyCodeResponse = {
	CouponPreset: {
		IsoCode: 'EUR',
		CouponPresetValues: {
			PresetOne: 1,
			PresetTwo: 2,
			PresetThree: 3,
			PresetFour: 5
		}
	},
	ResponseStatus: 1
}