export interface Login {
  access_token: string;
  token_type: string;
  expires_in: number;
  userName: string;
  '.issued': Date;
  '.expires': Date;
}

export interface AccountDetails {
  UserId: number;
  UserType: UserType;
  IsEndUser: boolean;
  ParentId?: number;
  UserName: string;
  FirstName: string;
  LastName: string;
  StreetAddress: string;
  Town: string;
  ZipCode: string;
  StateOrProvince: string;
  Country: string;
  BirthDate: Date;
  PhoneNumber: string;
  Email: string;
  TaxCode: string;
  PlayableBalance: number;
  WithdrawableBalance: number;
  WonBalance: number;
  BusyBalance: number;
  SportPromoBonusBalance: number;
  Currency: string;
  VerificationLevel: VerificationLevel;
  SubscriptionDate: Date;
  DocumentExpiryDate?: Date;
  CompanyId: number;
  CompanyName: string;
  TokenExpiresMinutes?: number;
  IdleTimeInMinutes: number;
  LastAccessTime?: Date;
  UserPolicies: UserPolicies;
  AreSecurityCredentialsSet: boolean;
  Overdraft: number;
  BlockedOverdraft: number;
  NewPrivacyPolicyStatementAdded: boolean;
  CanCreateAgentChildren: boolean;
  CanCreateCtdChildren: boolean;
}

export interface UserPolicies {
  CanCreateEndUserChildren: boolean;
  CanHaveChildren: boolean;
  CanHaveCommissions: boolean;
  IsNetworkOwner: boolean;
  CanPlaySportbookLive: boolean;
  CanPlaySportbookLiveByItself: boolean;
  CanPlaySportbookPrematch: boolean;
  CanPlaySportbookPrematchByItself: boolean;
  CanPlayVirtualGenerations: boolean;
  CanPlayVirtualGenerationsByItself: boolean;
  CanPlayThirdPartyGames: boolean;
  CanPlayCasino: boolean;
  CanPlayCasinoLive: boolean;
  CanPlayHorseRacing: boolean;
  CanPlayPoker: boolean;
  CanPlaySkillGames: boolean;
  CanPlayTotalizer: boolean;
  CanPlayTPVirtual: boolean;
}

export interface TreeSports {
  Sports: Sport[];
}

export interface Sport {
  id: number;
  nm: string;
  ec: number;
  stc: string;
  ts: Tournament[];
}

export interface Tournament {
  id: number;
  pid: number;
  nm: string;
  sdt: Date;
  edt: Date;
  sdtoffset: DataCue;
  cdt: number;
  ec: number;
  evs: Race[];
}

export interface Race {
  id: number;
  nm: string;
  mk: Market[];
  sdt: Date;
  edt: Date;
  sdtoffset: Date;
  cdt: number;
  tm: Statistic[];
  smc: number;
  st: number;
  ehv: boolean;
}

export interface Market {
  id: number;
  nm: string;
  tp: number;
  sls: PlayerOdds[];
  spv: string;
  otm: boolean;
}

export interface PlayerOdds {
  id: number;
  n: string;
  tp: number;
  ods: Odd[];
}

export interface Odd {
  vt: number;
  st: number;
}

export interface Statistic {
  id: number;
  nm: string;
  ito: number;
  ff: number;
  lrrs: string;
  ac: string;
  smc: number;
}

export interface EventResults {
  EventResults: EventResult[];
}

export interface EventResult {
  EventId: number;
  EventName: string;
  TournamentId: number;
  TournamentName: string;
  Result: string;
}

export interface CountDown {
  CountDown: number;
}

// ENUM List
export enum UserType {
  Agent = 1,
  WebUser,
  Ced
}

export enum VerificationLevel {
  NotYetVerified,
  PartlyVerified,
  FullyVerified
}
