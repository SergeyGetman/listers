import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ArrowRight } from '../../../../assets/Images/arrow-right.svg';
import FooterNavigateGarage from '../../FooterNavigationPanelGarage';
import { FooterStyleGarage } from './GarageFooterStyle';
import { changeDisabledBTNForm, stepperForPagesGeneralIfo } from '../../store/garageSliceV2';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { createNewTransportAllForm } from '../../store/garageThunkV2';
import { TransportData } from '../types';

interface IGarageFooter {
  pageNum: number;
}

const GarageFooter: FC<IGarageFooter> = ({ pageNum }) => {
  const sendData: TransportData = useAppSelector((state) => state.garageV2.getDataAllForms);
  const { dataFromPrevStep, isReadyForSubmit } = useAppSelector((state) => state.garageV2);
  const curentTransportType = localStorage.getItem('transportType');

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  // eslint-disable-next-line
  const sendDataInshuranceConcat: any = {
    ...dataFromPrevStep,
    ...sendData,
    transport_type: curentTransportType,
  };

  const [showButton] = useState<boolean>(true);

  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    const isSendDataReady = !!Object.entries(sendData).length;
    const isDataFromPrevStepReady = !!Object.entries(dataFromPrevStep).length;

    setDataReady(isSendDataReady && isDataFromPrevStepReady);
  }, [sendData, dataFromPrevStep]);

  useEffect(() => {
    if (isReadyForSubmit && dataReady) {
      dispatch(createNewTransportAllForm(sendDataInshuranceConcat));
    }
  }, [isReadyForSubmit, dataReady, sendDataInshuranceConcat, dispatch, pageNum]);

  function sendDataAwaitObject() {
    setDataReady(true);
    dispatch(changeDisabledBTNForm(true));
    dispatch(stepperForPagesGeneralIfo(pageNum + 1));
  }

  return (
    <>
      <FooterStyleGarage>
        <FooterNavigateGarage
          nextBtnProps={{
            isShow: showButton,
            label:
              pageNum === 0
                ? t('general.buttons.proceedToInsurance')
                : pageNum === 1
                ? t('general.buttons.proceedToGallery')
                : t('general.buttons.add'),

            endIcon: <ArrowRight />,
            isDisabled: false,
            onClick: () => sendDataAwaitObject(),
          }}
          skipBtnProps={{
            isShow: pageNum === 1,
            label: 'Skip',
            onClick: () => dispatch(stepperForPagesGeneralIfo(pageNum + 1)),
          }}
          backBtnProps={{
            isShow: showButton,
            label: 'Back',
            onClick: () => {
              dispatch(stepperForPagesGeneralIfo(pageNum - 1));
            },
          }}
        />
      </FooterStyleGarage>
    </>
  );
};

export default GarageFooter;
