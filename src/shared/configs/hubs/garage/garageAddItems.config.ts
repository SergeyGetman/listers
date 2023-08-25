import { TFunction } from 'i18next';
import { ReactComponent as CarIcon } from '../../../../assets/Images/hubs/garage/car.svg';
import { ReactComponent as MotorcycleIcon } from '../../../../assets/Images/hubs/garage/motorcycle.svg';
import { ReactComponent as BoatIcon } from '../../../../assets/Images/newGarage/create-item/Boat.svg';

import { GarageTransportTypeEnum } from '../../../enums/hubs/garage/garageTransportType.enum';

type GarageAddItemsConfigType = {
  [key: string]: {
    label: string;
    id: GarageTransportTypeEnum;
    icon?: any;
  };
};

export const getGarageAddItemsConfig = (t: TFunction, isStub?: boolean): GarageAddItemsConfigType => ({
  [GarageTransportTypeEnum.car]: {
    id: GarageTransportTypeEnum.car,
    label: isStub ? t('general.add', { item: t('garage.transportType.car') }) : t('garage.transportType.car'),
    icon: CarIcon,
  },
  [GarageTransportTypeEnum.motorcycle]: {
    id: GarageTransportTypeEnum.motorcycle,
    label: isStub
      ? t('general.add', { item: t('garage.transportType.motorcycle') })
      : t('garage.transportType.motorcycle'),
    icon: MotorcycleIcon,
  },
  [GarageTransportTypeEnum.custom]: {
    id: GarageTransportTypeEnum.custom,
    label: isStub
      ? t('general.add', { item: t('garage.transportType.custom') })
      : t('garage.transportType.custom'),
    icon: BoatIcon,
  },
});
