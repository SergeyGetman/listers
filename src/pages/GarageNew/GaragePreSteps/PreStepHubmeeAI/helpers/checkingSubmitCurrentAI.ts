import i18next from 'i18next';
import { NavigateFunction } from 'react-router/dist/lib/hooks';
import { FieldValues } from 'react-hook-form';
import { MediaType } from '../../../../../shared/models/media.model';
import { AppDispatch } from '../../../../../store/store';
import { getLicensePlateInfo, getVinInfo, scanningInsuranceCard } from '../../../store/garageThunkV2';
import { scanningVinOrLicensePlate } from './scanningVinOrLicensePlate';
import { setLoading } from '../../../../../store/Common/commonSlice';
import { setInsuranceRecognitionData, setInsuranceVehicle } from '../../../store/garageSliceV2';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import { Vehicles } from '../../../store/types';

export const checkingSubmitCurrentAI =
  (data: FieldValues, attachment: MediaType[], profileName: string) =>
  async (dispatch: AppDispatch, navigate: NavigateFunction) => {
    const { license_plate, state_on_license_plate, VIN } = data;

    if (!!VIN.length) {
      await dispatch(getVinInfo(VIN))
        .unwrap()
        .then(async (res) => {
          await scanningVinOrLicensePlate(res, dispatch, navigate, profileName);
        });

      return;
    }
    if (!!license_plate.length && !!state_on_license_plate.value.length) {
      await dispatch(
        getLicensePlateInfo({ licensePlate: license_plate, state: state_on_license_plate.value }),
      )
        .unwrap()
        .then(async (res) => {
          await scanningVinOrLicensePlate(res, dispatch, navigate, profileName);
        });

      return;
    }
    if (!!attachment.length) {
      dispatch(setLoading(true));
      // TODO add utils
      await dispatch(scanningInsuranceCard(attachment[0]?.id))
        .unwrap()
        .then(async (res) => {
          if (res?.recognition_data?.data.policy_number !== null) {
            if (res?.recognition_data?.data.vehicles.length > 1) {
              await dispatch(setInsuranceRecognitionData({ recognitionData: res?.recognition_data?.data }));
              modalObserver.addModal(ModalNamesEnum.ChooseInsurance, {
                props: {
                  vehicles: res?.recognition_data?.data.vehicles,
                  onClick: (chooseVehicle: Vehicles) => {
                    dispatch(setInsuranceVehicle({ chooseVehicle: chooseVehicle }));
                    navigate('/create-car');

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
                  },
                },
              });
            } else {
              await dispatch(setInsuranceRecognitionData({ recognitionData: res?.recognition_data?.data }));
              await dispatch(setInsuranceVehicle({ chooseVehicle: res?.recognition_data?.data.vehicles[0] }));
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
            }
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
        })
        .catch(() => {
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
        })
        .finally(() => dispatch(setLoading(false)));
    }
  };
