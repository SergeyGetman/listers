import { nanoid } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { ReactComponent as Hand } from '../../../assets/Images/newGarage/pre-step/Hand.svg';
import { ReactComponent as HubmeeAI } from '../../../assets/Images/newGarage/pre-step/hubmee-AI.svg';
import router from '../../../shared/services/router';
import { useAppSelector } from '../../../shared/hooks/redux';
import { PlanNamePackage } from '../../../shared/enums/planPeriodEnum';
import modalObserver from '../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import { getCurrentSubscriptionSelector } from '../store/garage-selectors';

export const useCreateBestWay = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentSubscription = useAppSelector(getCurrentSubscriptionSelector);
  const isPlatinumPackage = currentSubscription === PlanNamePackage.Platinum;

  const handleOpenUpgradePackageModal = () => {
    modalObserver.addModal(ModalNamesEnum.purchaseModal, {
      props: { isPlatinum: true },
    });
  };

  const BastWayList = [
    {
      item: {
        id: nanoid(),
        label: t('stubs.garage.preStep.bestWay.AI.title'),
        icon: HubmeeAI,
      },
      callback: () =>
        isPlatinumPackage
          ? navigate(router.garageNew.children.preStep.children.HubmeeAI.path)
          : handleOpenUpgradePackageModal(),
      subtitle: t('stubs.garage.preStep.bestWay.AI.subtitle'),
      isPlatinum: isPlatinumPackage,
    },
    {
      item: {
        id: nanoid(),
        label: t('stubs.garage.preStep.bestWay.hand.title'),
        icon: Hand,
      },
      callback: () => navigate(router.garageNew.children.preStep.children.manual.path),
      subtitle: t('stubs.garage.preStep.bestWay.hand.subtitle'),
    },
  ];

  return {
    BastWayList,
    t,
  };
};
