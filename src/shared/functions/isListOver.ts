import { MetaModel } from '../models/meta.model';

export const isListOver = (data: { meta: MetaModel }) =>
  !((data || {}).meta || {}).last_page ||
  (((data || {}).meta || {}).current_page &&
    ((data || {}).meta || {}).last_page &&
    ((data || {}).meta || {}).current_page === ((data || {}).meta || {}).last_page);
