import { RootState } from '../../../store/store';

export const getTransportTypeSelector = (state: RootState) => state.garageV2.transportType;
export const getIsListOverSelector = (state: RootState) => state.garageV2.isListOver;
export const getGarageMetaSelector = (state: RootState) => state.garageV2.transports.meta;
export const getProfileNameSelector = (state: RootState) => state.profile.data.first_name;
export const getGarageData = (state: RootState) => state.garageV2.transports.data;
export const getIsLoadingGarageSelector = (state: RootState) => state.garageV2.isLoadingGarage;
export const getFilterParamsSelector = (state: RootState) => state.garageV2.filterParams;
export const getIsEmptyGarageDataWithFiltersSelector = (state: RootState) =>
  state.garageV2.isEmptyGarageWithFilter;
export const getCurrentTransportSelector = (state: RootState) => state.garageV2.currentTransport;

export const getCurrentSubscriptionSelector = (state: RootState) => state.profile?.data?.subscription.name;
export const getCurrentUserIDSelector = (state: RootState) => state.profile?.data?.id;
