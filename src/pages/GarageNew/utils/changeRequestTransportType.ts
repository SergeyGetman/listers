import { TransportTypeEnum } from '../../../shared/enums/garage.enums';

export const changeRequestTransportType = (transportType: TransportTypeEnum) => {
  switch (transportType) {
    case TransportTypeEnum.motorcycle:
      return transportType.toUpperCase().slice(0, 4);

    default: {
      return transportType.toUpperCase();
    }
  }
};
