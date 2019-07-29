import { Area } from './main.models';
export const overviewAreas: Area = {
  id: 0,
  name: 'Overview',
  layoutDefinition: {
    areaCols: 1
  },
  markets: [
    {
      id: 10,
      name: '1X2',
      hasSpecialValue: false,
      specialValueOrSpread: 0,
      selectionCount: 3,
      selections: [],
      layoutGridDefinition: {
        marketPositionOnColArea: 1,
        marketCols: 3,
        marketRows: 1
      }
    },
    {
      id: 60,
      name: 'Over/Under',
      hasSpecialValue: true,
      specialValueOrSpread: 2.5,
      selectionCount: 2,
      selections: [],
      layoutGridDefinition: {
        marketPositionOnColArea: 1,
        marketCols: 2,
        marketRows: 1
      }
    },
    {
      id: 43,
      name: 'Goal/NoGoal',
      hasSpecialValue: false,
      specialValueOrSpread: 0,
      selectionCount: 2,
      selections: [],
      layoutGridDefinition: {
        marketPositionOnColArea: 1,
        marketCols: 2,
        marketRows: 1
      }
    }
  ]
};

export const areas: Area[] = [
  {
    id: 1,
    name: 'Main',
    layoutDefinition: {
      areaCols: 1
    },
    markets: [
      {
        id: 10,
        name: '1X2',
        hasSpecialValue: false,
        specialValueOrSpread: 0,
        selectionCount: 3,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 3,
          marketRows: 1
        }
      },
      {
        id: 60,
        name: 'Over/Under',
        hasSpecialValue: true,
        specialValueOrSpread: 2.5,
        selectionCount: 2,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 2,
          marketRows: 1
        }
      },
      {
        id: 46,
        name: 'DoubleChance',
        hasSpecialValue: false,
        specialValueOrSpread: 0,
        selectionCount: 3,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 3,
          marketRows: 1
        }
      },
      {
        id: 43,
        name: 'Goal/NoGoal',
        hasSpecialValue: false,
        specialValueOrSpread: 0,
        selectionCount: 2,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 2,
          marketRows: 1
        }
      }
    ]
  },
  {
    id: 2,
    name: 'Over/Under',
    layoutDefinition: {
      areaCols: 2
    },
    markets: [
      {
        id: 60,
        name: 'Over/Under',
        hasSpecialValue: true,
        specialValueOrSpread: 1.5,
        selectionCount: 2,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 2,
          marketRows: 1
        }
      },
      {
        id: 60,
        name: 'Over/Under',
        hasSpecialValue: true,
        specialValueOrSpread: 2.5,
        selectionCount: 2,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 2,
          marketRows: 1
        }
      },
      {
        id: 60,
        name: 'Over/Under',
        hasSpecialValue: true,
        specialValueOrSpread: 3.5,
        selectionCount: 2,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 2,
          marketRows: 1
        }
      },
      {
        id: 60,
        name: 'Over/Under',
        hasSpecialValue: true,
        specialValueOrSpread: 4.5,
        selectionCount: 2,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 2,
          marketRows: 1
        }
      },
      {
        id: 22,
        name: 'HomeO/U',
        hasSpecialValue: true,
        specialValueOrSpread: 0.5,
        selectionCount: 2,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 2,
          marketCols: 2,
          marketRows: 1
        }
      },
      {
        id: 22,
        name: 'HomeO/U',
        hasSpecialValue: true,
        specialValueOrSpread: 1.5,
        selectionCount: 2,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 2,
          marketCols: 2,
          marketRows: 1
        }
      },
      {
        id: 22,
        name: 'HomeO/U',
        hasSpecialValue: true,
        specialValueOrSpread: 2.5,
        selectionCount: 2,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 2,
          marketCols: 2,
          marketRows: 1
        }
      },
      {
        id: 22,
        name: 'HomeO/U',
        hasSpecialValue: true,
        specialValueOrSpread: 3.5,
        selectionCount: 2,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 2,
          marketCols: 2,
          marketRows: 1
        }
      },
      {
        id: 23,
        name: 'AwayO/U',
        hasSpecialValue: true,
        specialValueOrSpread: 0.5,
        selectionCount: 2,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 2,
          marketCols: 2,
          marketRows: 1
        }
      },
      {
        id: 23,
        name: 'AwayO/U',
        hasSpecialValue: true,
        specialValueOrSpread: 1.5,
        selectionCount: 2,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 2,
          marketCols: 2,
          marketRows: 1
        }
      },
      {
        id: 23,
        name: 'AwayO/U',
        hasSpecialValue: true,
        specialValueOrSpread: 2.5,
        selectionCount: 2,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 2,
          marketCols: 2,
          marketRows: 1
        }
      },
      {
        id: 23,
        name: 'AwayO/U',
        hasSpecialValue: true,
        specialValueOrSpread: 3.5,
        selectionCount: 2,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 2,
          marketCols: 2,
          marketRows: 1
        }
      }
    ]
  },
  {
    id: 3,
    name: 'HalfTime/FinalTime',
    layoutDefinition: {
      areaCols: 1
    },
    markets: [
      {
        id: 44,
        name: 'HT/FT',
        hasSpecialValue: false,
        specialValueOrSpread: 0,
        selectionCount: 9,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 3,
          marketRows: 3
        }
      }
    ]
  },
  {
    id: 4,
    name: 'Goals',
    layoutDefinition: {
      areaCols: 2
    },
    markets: [
      {
        id: 13,
        name: 'FinalGoalsNumber',
        hasSpecialValue: false,
        specialValueOrSpread: 0,
        selectionCount: 9,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 3,
          marketRows: 3
        }
      },
      {
        id: 658,
        name: 'TotalGoals',
        hasSpecialValue: false,
        specialValueOrSpread: 0,
        selectionCount: 4,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 2,
          marketCols: 1,
          marketRows: 4
        }
      }
    ]
  },
  {
    id: 5,
    name: 'CorrectScore',
    layoutDefinition: {
      areaCols: 1
    },
    markets: [
      {
        id: 2,
        name: 'CorrectScore',
        hasSpecialValue: false,
        specialValueOrSpread: 0,
        selectionCount: 25,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 3,
          marketRows: 9
        }
      }
    ]
  },
  {
    id: 6,
    name: 'Scores1HT',
    layoutDefinition: {
      areaCols: 1
    },
    markets: [
      {
        id: 1009,
        name: 'CScore1HT',
        hasSpecialValue: false,
        specialValueOrSpread: 0,
        selectionCount: 9,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 3,
          marketRows: 3
        }
      }
    ]
  },
  {
    id: 7,
    name: 'Scores2HT',
    layoutDefinition: {
      areaCols: 1
    },
    markets: [
      {
        id: 1018,
        name: 'CScore2HT',
        hasSpecialValue: false,
        specialValueOrSpread: 0,
        selectionCount: 9,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 3,
          marketRows: 3
        }
      }
    ]
  },
  {
    id: 8,
    name: 'ComboO/U',
    layoutDefinition: {
      areaCols: 1
    },
    markets: [
      {
        id: 689,
        name: '1X2+O/U',
        hasSpecialValue: true,
        specialValueOrSpread: 1.5,
        selectionCount: 6,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 6,
          marketRows: 1
        }
      },
      {
        id: 689,
        name: '1X2+O/U',
        hasSpecialValue: true,
        specialValueOrSpread: 2.5,
        selectionCount: 6,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 6,
          marketRows: 1
        }
      },
      {
        id: 689,
        name: '1X2+O/U',
        hasSpecialValue: true,
        specialValueOrSpread: 3.5,
        selectionCount: 6,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 6,
          marketRows: 1
        }
      },
      {
        id: 32,
        name: 'DoubleChance+O/U',
        hasSpecialValue: true,
        specialValueOrSpread: 1.5,
        selectionCount: 6,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 6,
          marketRows: 1
        }
      },
      {
        id: 32,
        name: 'DoubleChance+O/U',
        hasSpecialValue: true,
        specialValueOrSpread: 2.5,
        selectionCount: 6,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 6,
          marketRows: 1
        }
      },
      {
        id: 32,
        name: 'DoubleChance+O/U',
        hasSpecialValue: true,
        specialValueOrSpread: 3.5,
        selectionCount: 6,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 6,
          marketRows: 1
        }
      }
    ]
  },
  {
    id: 9,
    name: 'ComboGG/NG',
    layoutDefinition: {
      areaCols: 2
    },
    markets: [
      {
        id: 722,
        name: '1X2+GG/NG',
        hasSpecialValue: false,
        specialValueOrSpread: 0,
        selectionCount: 6,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 1,
          marketCols: 3,
          marketRows: 2
        }
      },
      {
        id: 34,
        name: 'DoubleChance+GG/NG',
        hasSpecialValue: false,
        specialValueOrSpread: 0,
        selectionCount: 6,
        selections: [],
        layoutGridDefinition: {
          marketPositionOnColArea: 2,
          marketCols: 3,
          marketRows: 2
        }
      }
    ]
  }
];
