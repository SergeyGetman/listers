import { NewsItemModel } from './newsItem.model';
import { MetaModel } from '../../meta.model';

export type GetNewsResponseModel = {
  data: NewsItemModel[];
  meta: MetaModel;
  links: {
    first: string;
    last: string;
    next: string | null;
    prev: string | null;
  };
};
