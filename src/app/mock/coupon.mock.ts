import { CouponLimitHierarchy, CurrencyCodeResponse } from '@elys/elys-api';
import { BetCouponOddExtended } from '@elys/elys-coupon';
import { InternalCoupon } from '../component/coupon/coupon.model';

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
			MaxBetStake: 200,
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

export const mockCoupon: InternalCoupon = {
  BettorId: 10886,
  ClientBettorId: 10886,
  CouponCategory: 3,
  CouponLimit: {
    ApplyMultipleBetWinLimitOnEachCombination: false,
    IsDiscreteRateForSingleAndMultipleBets: false,
    ListIdCurrencyCouponGlobalVariable: null,
    MaxBetStake: 100,
    MaxCombinationBetWin: 5000,
    MaxCombinationsByCoupon: 9999999,
    MaxCombinationsByGrouping: 100000,
    MaxCouponCombinations: 200,
    MaxCouponEvents: 999,
    MaxCouponOdds: 120,
    MaxGroupingsBetStake: 100,
    MaxMultipleBetWin: 5000,
    MaxSingleBetWin: 5000,
    MinBetStake: 0.5,
    MinBonusOdd: 1.18,
    MinCombinationBetRate: 0,
    MinGroupingsBetStake: 0.05
  },
  CouponRequestId: "a5be3cce51354caea92d2c890ada6cbf",
  CouponTypeId: 3,
  CurrencyId: 1,
  DoNotAllowOddChanges: false,
  DoNotAllowStakeReduction: false,
  Evaluation: 0,
  EvaluationReason: 0,
  Groupings: [{
    Combinations: 6,
    Grouping: 1,
    IsMultiStake: false,
    MaxBonusCombination: 0,
    MaxBonusCombinationUnit: 0,
    MaxBonusUnit: 0,
    MaxWinCombination: 55.56,
    MaxWinCombinationUnit: 55.56,
    MaxWinUnit: 55.56,
    MinBonusUnit: 0,
    MinWinUnit: 33.2,
    Selected: true,
    Stake: 1
  }],
  Odds: [{
    CompatibilityLevel: 0,
    CompetitorId: 3313,
    DefaultCategoryName: "DogRacing - 17 agosto",
    DefaultCompetitorName: "1 - Wild",
    DefaultEventName: "Race n. 198",
    DefaultMarketName: "Winner",
    DefaultPlayerCompetitorName: null,
    DefaultSelectionName: "Wild",
    DefaultTournamentName: "Tournament DogRacing",
    EndDate: new Date("2022-08-17T09:17:00"),
    EndDateOffset: new Date("2022-08-17T09:17:00+02:00"),
    EventCategory: "V",
    EventDate: new Date("2022-08-17T09:17:00"),
    EventDateOffset: new Date("2022-08-17T09:17:00+02:00"),
    EventName: "Race n. 198",
    Fixed: false,
    GamePlay: 1,
    LocalizedCategoryName: "DogRacing - 17 agosto",
    LocalizedCompetitorName: "1 - Wild",
    LocalizedPlayerCompetitorName: null,
    MarketId: 366308338,
    MarketName: "Vincente",
    MarketSpread: 0,
    MarketTypeId: 40,
    MatchId: 21238764,
    MaximumSelectionsToMark: 255,
    MinimumSelectionsToMark: 0,
    OddId: 0,
    OddStake: 1,
    OddValue: 4.91,
    OnLineCode: 3663,
    Outright: 1,
    PlayerCompetitorId: null,
    // ProviderCategoryType: "DOG",
    ProviderEventId: null,
    RiskLimit: {LimitItemTypeId: 0, MaxCombinability: 0},
    SelectionId: 575081323,
    SelectionName: "Wild",
    SelectionSpread: null,
    SelectionTypeId: 1,
    SettleFormula: "[IDTEAM]=[1ST]",
    SettleMethod: "F",
    SpecialValue: "",
    SportId: 8,
    SpreadMarket: 0,
    TournamentId: 21236817,
    TournamentName: "Tournament DogRacing",
    UserCouponLimit: {
      LiveRisk: 0,
      MaxLoss: 10000,
      MaxStake: 500,
      PrematchRisk: 0,
      RiskValue: 1,
      VirtualRisk: 0
    },
    WinCombinationUnit: 0
  } as BetCouponOddExtended],
  Outcome: 0,
  PlaySourceId: 8,
  Stake: 6,
  TaxPercentage: 0,
  TotalCombinations: 6,
  UserCouponLimit: {
    LiveRisk: 0,
    MaxLoss: 10000,
    MaxStake: 500,
    PrematchRisk: 0,
    RiskValue: 1,
    VirtualRisk: 0
  },
  UserId: 569673,
  internal_ResponseStatus: 2,
  internal_isReadyToPlace: false
}
