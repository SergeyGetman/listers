import { NavigateFunction } from 'react-router/dist/lib/hooks';
import { setGarageTransportType } from '../store/garageSliceV2';
import { TransportTypeEnum } from '../../../shared/enums/garage.enums';
import { AppDispatch } from '../../../store/store';

export const createTransportType =
  (transportType: TransportTypeEnum, route: string) =>
  async (dispatch: AppDispatch, navigate: NavigateFunction) => {
    await dispatch(setGarageTransportType({ transportType }));
    localStorage.setItem('transportType', transportType);
    navigate(route);
  };
