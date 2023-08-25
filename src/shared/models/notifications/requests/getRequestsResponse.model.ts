import { RequestItemModel } from './requestItem.model';
import { MetaModel } from '../../meta.model';

export type GetRequestsResponseModel = {
  data: RequestItemModel[];
  meta: MetaModel;
};
