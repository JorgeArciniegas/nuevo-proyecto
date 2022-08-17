import { Products } from "src/environments/environment.models";

export const mockProduct: Products = {
  codeProduct: "DOG",
  isPlayable: true,
  label: "DOG",
  layoutProducts: {type: 0, resultItems: 4, nextEventItems: 5, cacheEventsItem: 10, multiFeedType: 'F2'},
  name: "DogRacing",
  order: 0,
  productSelected: true,
  sportId: 8,
  toolbarButton: {name: 'dogracing', icon: 'Dog', route: 'products/racing'},
  typeCoupon: {isMultipleStake: true, acceptMultiStake: true, typeLayout: 0},
  widgets: [
    {name: '', routing: 'statistic', typeLink: 0, icon: 'baseline-assessment-24px'}
  ]
}
