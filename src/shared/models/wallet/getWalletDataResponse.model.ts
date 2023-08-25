import { MetaModel } from '../meta.model';
import { WalletItemModal } from './walletItem.model';

export type GetWalletDataResponseModel = {
  data: WalletItemModal[];
  meta: MetaModel;
};
