import { cardsTypeOptionsIDs, orderByOptionsIDs } from '../../projects/_shared/_other/projects-shared-properties';

export interface OrderByOption {
  id : string | orderByOptionsIDs,
  description : string
}


export interface CardsTypeOption {
  id : string | cardsTypeOptionsIDs,
  description : string
}

