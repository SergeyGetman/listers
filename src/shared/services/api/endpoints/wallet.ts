import axios from 'axios';
import { GetWalletDataResponseModel } from '../../../models/wallet/getWalletDataResponse.model';
import { WalletFilters } from '../../../../store/wallet/walletSlice';

const walletEndpoint = {
  getWalletItems: (params: WalletFilters & { page?: number }): Promise<GetWalletDataResponseModel> =>
    axios.get('/payments', { params }),
};

export default walletEndpoint;
