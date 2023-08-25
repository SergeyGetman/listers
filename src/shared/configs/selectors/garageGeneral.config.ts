import i18next from 'i18next';
import { FrequencyEnum } from '../../enums/frequency.enum';
import { TransportBodyEnums, TransportStyleEnum, TransportTypeEnum } from '../../enums/garage.enums';

type ConfigType = {
  [key: string]: {
    label: string;
    value: string;
  };
};

export const TransportTypeConfig: ConfigType = {
  [TransportTypeEnum.car]: {
    value: TransportTypeEnum.car,
    label: i18next.t('garage.transportType.car'),
  },
  [TransportTypeEnum.motorcycle]: {
    value: TransportTypeEnum.motorcycle,
    label: i18next.t('garage.transportType.motorcycle'),
  },
  [FrequencyEnum.once_a_two_weeks]: {
    value: TransportTypeEnum.custom,
    label: i18next.t('garage.transportType.custom'),
  },
};

export const StyleTypeConfig: ConfigType = {
  [TransportStyleEnum.sportbike]: {
    value: TransportStyleEnum.sportbike,
    label: i18next.t('garage.styleType.sportbike'),
  },
  [TransportStyleEnum.cruisers]: {
    value: TransportStyleEnum.cruisers,
    label: i18next.t('garage.styleType.cruisers'),
  },
  [TransportStyleEnum.standart_naked]: {
    value: TransportStyleEnum.standart_naked,
    label: i18next.t('garage.styleType.standart_naked'),
  },
  [TransportStyleEnum.touring_sportTouring]: {
    value: TransportStyleEnum.touring_sportTouring,
    label: i18next.t('garage.styleType.touring_sportTouring'),
  },
  [TransportStyleEnum.dualSport]: {
    value: TransportStyleEnum.dualSport,
    label: i18next.t('garage.styleType.dualSport'),
  },
  [TransportStyleEnum.offRoad]: {
    value: TransportStyleEnum.offRoad,
    label: i18next.t('garage.styleType.offRoad'),
  },
  [TransportStyleEnum.electric]: {
    value: TransportStyleEnum.electric,
    label: i18next.t('garage.styleType.electric'),
  },
};

export const TransportBodyTypeConfig: ConfigType = {
  [TransportBodyEnums.sedan]: {
    value: TransportBodyEnums.sedan,
    label: i18next.t('garage.bodyType.sedan'),
  },
  [TransportBodyEnums.sportCar]: {
    value: TransportBodyEnums.sportCar,
    label: i18next.t('garage.bodyType.sportCar'),
  },
  [TransportBodyEnums.hatchback]: {
    value: TransportBodyEnums.hatchback,
    label: i18next.t('garage.bodyType.hatchback'),
  },
  [TransportBodyEnums.muv_suv]: {
    value: TransportBodyEnums.muv_suv,
    label: i18next.t('garage.bodyType.muv_suv'),
  },
  [TransportBodyEnums.coupe]: {
    value: TransportBodyEnums.coupe,
    label: i18next.t('garage.bodyType.coupe'),
  },
  [TransportBodyEnums.convertible]: {
    value: TransportBodyEnums.convertible,
    label: i18next.t('garage.bodyType.convertible'),
  },
  [TransportBodyEnums.wagon]: {
    value: TransportBodyEnums.wagon,
    label: i18next.t('garage.bodyType.wagon'),
  },
  [TransportBodyEnums.jeep]: {
    value: TransportBodyEnums.jeep,
    label: i18next.t('garage.bodyType.jeep'),
  },
  [TransportBodyEnums.van]: {
    value: TransportBodyEnums.van,
    label: i18next.t('garage.bodyType.van'),
  },
  [TransportBodyEnums.minivan]: {
    value: TransportBodyEnums.minivan,
    label: i18next.t('garage.bodyType.minivan'),
  },
  [TransportBodyEnums.crossover]: {
    value: TransportBodyEnums.crossover,
    label: i18next.t('garage.bodyType.crossover'),
  },
  [TransportBodyEnums.landaulet]: {
    value: TransportBodyEnums.landaulet,
    label: i18next.t('garage.bodyType.landaulet'),
  },
  [TransportBodyEnums.limousine]: {
    value: TransportBodyEnums.limousine,
    label: i18next.t('garage.bodyType.limousine'),
  },
  [TransportBodyEnums.roadster]: {
    value: TransportBodyEnums.roadster,
    label: i18next.t('garage.bodyType.roadster'),
  },
};
