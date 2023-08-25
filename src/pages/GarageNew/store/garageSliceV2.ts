import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransportTypeEnum } from '../../../shared/enums/garage.enums';
import { VinAndLicensePlateInfoType } from '../../../shared/models/garage/vin-info';
import {
  acceptedTransportWS,
  addTransportWS,
  createNewTransport,
  getTransportsV2,
  updateTransportWS,
} from './garageThunkV2';
import { TransportData } from '../components/types';
import {
  FilterParams,
  GetTransportsParams,
  RecognitionDataType,
  RootGarageItemsData,
  RootMeta,
  Vehicles,
} from './types';
import { ItemUserModel } from '../../../shared/models/itemUser.model';
import { StatusTransport } from '../GarageMainPage/components/GarageMainPageItems/GarageCardItems/GarageCardItem/GarageCardItem';
import { isListOver } from '../../../shared/functions/isListOver';

const storageFilterParams =
  JSON.parse(localStorage.getItem('garageFilters') as string) !== null
    ? JSON.parse(localStorage.getItem('garageFilters') as string)
    : {
        query: '',
        shared_filters: [],
      };

const initialState = {
  transportType: '' as TransportTypeEnum,
  insuranceRecognitionData: {} as RecognitionDataType,
  insuranceVehicle: {} as Vehicles,
  vinAndLicensePlate: {} as VinAndLicensePlateInfoType,
  isLoadingGarage: false,
  isEmptyGarageWithFilter: false,
  isListOver: false as boolean | number,
  transports: {
    data: [] as RootGarageItemsData[],
    meta: {} as RootMeta,
  },
  currentTransport: {} as RootGarageItemsData,
  filterParams: storageFilterParams as FilterParams,
  pageNumber: 0,
  disabledButton: false,
  dataFromPrevStep: {
    transport_type: '',
    year: '',
    make: '',
    model: '',
  },
  isDisabled: true,
  createNewTransport: {},
  getDataAllForms: {} as TransportData,
  isReadyForSubmit: false,
  isVisibleAi: true,
  usersCoveredPeople: {} as ItemUserModel,
  arrayPeopleCovered: [] as ItemUserModel[],
  arrayPeopleAgency: [] as ItemUserModel[],
  arrayPeopleAgent: [] as ItemUserModel[],
};
type InitialStateType = typeof initialState;
export const garageSliceV2 = createSlice({
  name: 'garageV2',
  initialState: initialState as InitialStateType,
  reducers: {
    setGarageTransportType(state, action: PayloadAction<{ transportType: TransportTypeEnum }>) {
      state.transportType = action.payload.transportType;
    },
    setVinAndLicensePlateData: (state, action: PayloadAction<VinAndLicensePlateInfoType>) => {
      state.vinAndLicensePlate = action.payload;
    },
    clearTransportsState(state) {
      state.transports = initialState.transports;
    },
    setCurrentTransport(state, action: PayloadAction<{ transport: RootGarageItemsData }>) {
      state.currentTransport = action.payload.transport;
    },
    stepperForPagesGeneralIfo(state, action) {
      const newPageNumber = action.payload;
      if (newPageNumber >= 0 && newPageNumber <= 2) {
        state.pageNumber = newPageNumber;
      }
    },
    setDataFromPreSteps(state, action) {
      state.dataFromPrevStep = action.payload;
    },
    setInsuranceRecognitionData(state, action: PayloadAction<{ recognitionData: RecognitionDataType }>) {
      state.insuranceRecognitionData = action.payload.recognitionData;
    },
    clearInsuranceRecognitionData(state) {
      state.insuranceRecognitionData = {} as RecognitionDataType;
    },
    setInsuranceVehicle(state, action: PayloadAction<{ chooseVehicle: Vehicles }>) {
      state.insuranceVehicle = action.payload.chooseVehicle;
    },
    changeDisabledBTNForm(state, action) {
      state.isReadyForSubmit = action.payload;
    },
    changeDisableBTN(state, action) {
      state.isDisabled = action.payload;
    },
    changeVisibleAiNotification(state, action) {
      state.isVisibleAi = action.payload;
    },
    getDataAllDataForm(state, action) {
      state.getDataAllForms = action.payload;
      if (state.getDataAllForms) {
        state.getDataAllForms = {
          trim: action.payload.trim?.label,
          body: action.payload.body?.label,
          exterior_color: action.payload.exterior_color?.value || action.payload.exterior_color.label,
          interior_color: action.payload.interior_color?.value || action.payload.interior_color.label,
          fuel_type: action.payload.fuel_type?.value || action.payload.fuel_type.label,
          engine_type: action.payload?.engine_type || action.payload.engine_type,
          transmission: action.payload.transmission?.value || action.payload.transmission.label,
          country_of_assembly: action.payload?.country_of_assembly,
          mileage: action.payload?.mileage,
          drivetrain: action.payload.drivetrain,
          vin: action.payload?.vin,
          documents: [],
        };
      }
    },
    setFilterParams(state, action: PayloadAction<{ params: FilterParams }>) {
      localStorage.setItem('garageFilters', JSON.stringify(action.payload.params));

      state.filterParams = action.payload.params;
    },
    isEmptyDataGarageWithFilter(
      state,
      action: PayloadAction<{
        filters: Pick<GetTransportsParams, 'shared_filters' | 'query'>;
        garageData: RootGarageItemsData[];
      }>,
    ) {
      const { shared_filters, query } = action.payload.filters;
      state.isEmptyGarageWithFilter =
        (!!shared_filters?.length || !!query) && !action.payload.garageData.length;
    },
    setLoadingGarage(state, action: PayloadAction<{ isLoading: boolean }>) {
      state.isLoadingGarage = action.payload.isLoading;
    },
    deleteCurrentTransport(state, action: PayloadAction<{ transportID: number }>) {
      const index = state.transports.data.findIndex(
        (transport) => transport.id === action.payload.transportID,
      );
      if (index !== -1) state.transports.data.splice(index, 1);
    },
    setTransportDataWithNewPosition(
      state,
      action: PayloadAction<{ newPositionData: RootGarageItemsData[] }>,
    ) {
      state.transports.data = action.payload.newPositionData;
    },
    updateDataPeopleCovered(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.arrayPeopleCovered.findIndex((item) => item.id === newItem.id);

      if (existingItemIndex === -1) {
        state.arrayPeopleCovered.push(newItem);
      } else {
        state.arrayPeopleCovered[existingItemIndex] = newItem;
      }
      if (state.arrayPeopleCovered.length >= 6) {
        state.arrayPeopleCovered.length = 5;
      }
    },
    updateDataPeopleAgency(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.arrayPeopleAgency.findIndex((item) => item.id === newItem.id);

      if (existingItemIndex === -1) {
        state.arrayPeopleAgency.push(newItem);
      } else {
        state.arrayPeopleAgency[existingItemIndex] = newItem;
      }
      if (state.arrayPeopleAgency.length >= 1) {
        state.arrayPeopleAgency.length = 1;
      }
    },
    updateDataPeopleAgent(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.arrayPeopleAgent.findIndex((item) => item.id === newItem.id);

      if (existingItemIndex === -1) {
        state.arrayPeopleAgent.push(newItem);
      } else {
        state.arrayPeopleAgent[existingItemIndex] = newItem;
      }
      if (state.arrayPeopleAgent.length >= 6) {
        state.arrayPeopleAgent.length = 5;
      }
    },
    removeDataPeopleCoverItem(state, action) {
      state.arrayPeopleCovered = state.arrayPeopleCovered.filter((arrow) => arrow.id !== action.payload);
    },
    removeDataAgencyItem(state, action) {
      state.arrayPeopleAgency = state.arrayPeopleAgency.filter((obj) => obj.id !== action.payload);
    },
    removeDataAgentItem(state, action) {
      state.arrayPeopleAgent = state.arrayPeopleAgent.filter((objel) => objel.id !== action.payload);
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(getTransportsV2.fulfilled, (state, { payload }) => {
      if (payload.meta.current_page === 1) {
        state.transports.data = payload.data;
        state.transports.meta = payload.meta;
        state.isListOver = isListOver(payload);
      } else {
        state.transports.data.push(...payload.data);
        state.transports.meta = payload.meta;
        state.isListOver = isListOver(payload);
      }
    });

    addCase(createNewTransport.fulfilled, (state, { payload }) => {
      state.createNewTransport = payload;
    });
    addCase(
      updateTransportWS.fulfilled,
      (state, action: PayloadAction<{ updateTransportWS: RootGarageItemsData }>) => {
        const index = state.transports.data.findIndex(
          (transport) => transport.id === action.payload.updateTransportWS.id,
        );

        if (index !== -1) {
          state.transports.data[index] = action.payload.updateTransportWS;
        }
      },
    );
    addCase(
      acceptedTransportWS.fulfilled,
      (state, action: PayloadAction<{ acceptedTransportWS: RootGarageItemsData }>) => {
        const index = state.transports.data.findIndex(
          (transport) => transport.id === action.payload.acceptedTransportWS.id,
        );
        state.transports.data.splice(index, 1);

        const pending = state.transports.data.filter(
          (transport) => transport.current.confirm_status === StatusTransport.pending,
        );
        const general = state.transports.data.filter(
          (transport) => transport.current.confirm_status !== StatusTransport.pending,
        );

        state.transports.data = [...pending, action.payload.acceptedTransportWS, ...general];
      },
    );
    addCase(
      addTransportWS.fulfilled,
      (state, action: PayloadAction<{ addTransportWS: RootGarageItemsData }>) => {
        const index = state.transports.data.findIndex(
          (transport) => transport.id === action.payload.addTransportWS.id,
        );

        if (index !== -1) {
          state.transports.data[index] = action.payload.addTransportWS;
        } else {
          state.transports.data = !!state.transports.data.length
            ? [action.payload.addTransportWS, ...state.transports.data]
            : [action.payload.addTransportWS];
        }
      },
    );
  },
});

export const {
  setGarageTransportType,
  setVinAndLicensePlateData,
  clearTransportsState,
  setInsuranceRecognitionData,
  setInsuranceVehicle,
  stepperForPagesGeneralIfo,
  setDataFromPreSteps,
  clearInsuranceRecognitionData,
  getDataAllDataForm,
  changeDisabledBTNForm,
  changeVisibleAiNotification,
  setFilterParams,
  setLoadingGarage,
  isEmptyDataGarageWithFilter,
  deleteCurrentTransport,
  setTransportDataWithNewPosition,
  removeDataPeopleCoverItem,
  updateDataPeopleCovered,
  changeDisableBTN,
  updateDataPeopleAgency,
  removeDataAgencyItem,
  setCurrentTransport,
  updateDataPeopleAgent,
  removeDataAgentItem,
} = garageSliceV2.actions;
export const garageReducerV2 = garageSliceV2.reducer;
