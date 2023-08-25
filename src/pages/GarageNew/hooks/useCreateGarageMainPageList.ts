import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { GarageCreateItemIcon } from '../enum/garage-create-item-icon';
import router from '../../../shared/services/router';
import { createTransportType } from '../utils/createTrasnportType';
import { TransportTypeEnum } from '../../../shared/enums/garage.enums';
import { useAppDispatch } from '../../../shared/hooks/redux';

export const useCreateGarageMainPageList = (isMobile: boolean) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return [
    {
      label: t('general.add', { item: t('garage.transportType.car') }),
      callback: () =>
        createTransportType(TransportTypeEnum.car, router.garageNew.children.preStep.path)(
          dispatch,
          navigate,
        ),
      isContainStartIcon: true,
      startIcon: GarageCreateItemIcon.CAR,
      isDisabled: false,
    },
    {
      label: t('general.add', { item: t('garage.transportType.motorcycle') }),
      callback: () =>
        createTransportType(TransportTypeEnum.motorcycle, router.garageNew.children.preStep.path)(
          dispatch,
          navigate,
        ),
      isContainStartIcon: true,
      startIcon: GarageCreateItemIcon.BIKE,
      isDisabled: false,
    },
    {
      label: t('general.add', { item: t('garage.transportType.custom') }),
      callback: () =>
        createTransportType(TransportTypeEnum.custom, router.garageNew.children.preStep.path)(
          dispatch,
          navigate,
        ),
      isContainStartIcon: true,
      startIcon: !isMobile ? GarageCreateItemIcon.BOAT : GarageCreateItemIcon.CUSTOM,
      isDisabled: false,
    },
  ];
};
