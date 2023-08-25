import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { GarageTransportTypeEnum } from '../../../shared/enums/hubs/garage/garageTransportType.enum';
import { getGarageAddItemsConfig } from '../../../shared/configs/hubs/garage/garageAddItems.config';
import router from '../../../shared/services/router';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { createTransportType } from '../utils/createTrasnportType';
import { TransportTypeEnum } from '../../../shared/enums/garage.enums';

export const useCreateGarageStubList = () => {
  const { t } = useTranslation();
  const garageAddItemConfig = getGarageAddItemsConfig(t, true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const garageStubMenuList = [
    {
      item: garageAddItemConfig[GarageTransportTypeEnum.car],
      callback: () =>
        createTransportType(TransportTypeEnum.car, router.garageNew.children.preStep.path)(
          dispatch,
          navigate,
        ),
    },
    {
      item: garageAddItemConfig[GarageTransportTypeEnum.motorcycle],
      callback: () =>
        createTransportType(TransportTypeEnum.motorcycle, router.garageNew.children.preStep.path)(
          dispatch,
          navigate,
        ),
    },
    {
      item: garageAddItemConfig[GarageTransportTypeEnum.custom],
      callback: () =>
        createTransportType(TransportTypeEnum.custom, router.garageNew.children.preStep.path)(
          dispatch,
          navigate,
        ),
    },
  ];

  return {
    garageStubMenuList,
  };
};
