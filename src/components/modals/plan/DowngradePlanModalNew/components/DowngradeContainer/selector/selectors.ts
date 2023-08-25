import { RootState } from '../../../../../../../store/store';

export const getCurrentSubscriptionSelector = (state: RootState) => state.profile?.data?.subscription;
export const isLoadingSelector = (state: RootState) => state.common.loaders[0];
