import { MetaModel } from '../meta.model';
import { EventItemModel } from './eventItem.model';

export type GetEventsDataResponseModel = {
  data: EventItemModel[];
  meta: MetaModel;
};
