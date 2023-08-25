import { NavigateFunction } from 'react-router/dist/lib/hooks';
import i18next from 'i18next';
import { VinAndLicensePlateInfoType } from '../../../../../shared/models/garage/vin-info';
import { AppDispatch } from '../../../../../store/store';
import { setVinAndLicensePlateData } from '../../../store/garageSliceV2';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import { ResultInfo } from '../../../store/types';

export const scanningVinOrLicensePlate = async (
  res: ResultInfo<VinAndLicensePlateInfoType>,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  profileName: string,
) => {
  if (res.status === 200) {
    await dispatch(setVinAndLicensePlateData(res.data));

    modalObserver.addModal(ModalNamesEnum.alertModal, {
      props: {
        modalContent: {
          variantIcon: 'done',
          header: i18next.t('garageNew.alertModal.success.header'),
          title: i18next.t('garageNew.alertModal.success.title', {
            name: profileName,
          }),
          subtitle: i18next.t('garageNew.alertModal.success.subtitle'),
          isShowFooter: true,
        },
        rightBtnProps: {
          isShow: true,
          label: i18next.t('general.buttons.great'),
          onClick: () => modalObserver.removeModal(ModalNamesEnum.alertModal),
        },
        middleBtnProps: { isShow: false },
      },
    });
    navigate('/create-car');
  } else {
    modalObserver.addModal(ModalNamesEnum.alertModal, {
      props: {
        modalContent: {
          variantIcon: 'warning',
          header: i18next.t('garageNew.alertModal.error.header'),
          title: i18next.t('garageNew.alertModal.error.title'),
          subtitle: i18next.t('garageNew.alertModal.error.subtitle'),
          isShowFooter: true,
        },
        rightBtnProps: {
          isShow: true,
          label: i18next.t('general.buttons.ok'),
          onClick: () => modalObserver.removeModal(ModalNamesEnum.alertModal),
        },
        middleBtnProps: { isShow: false },
      },
    });
  }
};
