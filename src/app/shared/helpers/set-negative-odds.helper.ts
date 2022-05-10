import { VirtualBetMarket, VirtualDetailOddsOfEventResponse } from "@elys/elys-api";

export const setNegativeOdds = (sportDetail: VirtualDetailOddsOfEventResponse): void => {
    if(!sportDetail.Sport) return;
    const mockData = [
      {
        sportName: 'DogRacing',
        markets: [
          {
            nm: 'Trifecta',
            sls: [
              {
                nm: '1-2-3',
                oddVal: -1
              },
              {
                nm: '2-3-4',
                oddVal: -2
              },
            ]
          }
        ]
      },
      {
        sportName: 'CockRacing',
        markets: [
          {
            nm: '1X2',
            sls: [
              {
                nm: '1',
                oddVal: -1
              },
              {
                nm: 'X',
                oddVal: -2
              },
            ]
          }
        ]
      },
      {
        sportName: 'Soccer',
        markets: [
          {
            nm: '1X2',
            sls: [
              {
                nm: '1',
                oddVal: -1
              },
              {
                nm: 'X',
                oddVal: -3
              },
            ]
          }
        ]
      }
    ];
    const sportName: string = sportDetail.Sport.nm;
    const market: VirtualBetMarket[] = sportDetail.Sport.ts[0].evs[0].mk;
    mockData.forEach(data => {
      if(data.sportName === sportName){
        data.markets.forEach(marketEl => {
          const marketIndex = market.findIndex(el => el.nm === marketEl.nm);
          if(marketIndex !== -1){
            marketEl.sls.forEach(slsEl => {
              const slsIndex = market[marketIndex].sls.findIndex(el => el.nm === slsEl.nm);
              if(slsIndex !== -1) {
                market[marketIndex].sls[slsIndex].ods[0].vl = slsEl.oddVal;
              }
            })
          }
        })
      }
    })
  }