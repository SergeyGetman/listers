import React, { ChangeEvent, useState } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

import { useTranslation } from 'react-i18next';
import MuiModalDowngrade from '../../../../components/modalsElements/containers/MuiModalDowngrade/MuiModalDowngrade';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import { ReactComponent as InfoSVG } from '../../../../assets/Images/alertsIcon/Info.svg';
import MuiRadioButton from '../../../../components/formElements/MuiRadioButton';
import ModalFooter from '../../../../components/modalsElements/containers/Footer/ModalFooter';
import { Vehicles } from '../../store/types';
import { ItemContainer, TextBlockContainer, TextWrapper } from './chooseInsurance.style';

const ChooseInsuranceModal = ({ isOpen, props }: ModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const [check, setCheck] = useState('');
  const [confirmItem, setConfirmItem] = useState({});

  const onClose = () => modalObserver.removeModal(ModalNamesEnum.ChooseInsurance);

  const handleConfirm = () => {
    props?.onClick?.(confirmItem);
    onClose();
  };

  const handlerChangeCheck = (e: ChangeEvent<HTMLInputElement>, item: Vehicles) => {
    const currentCheck = e.currentTarget.value;

    setCheck(currentCheck);
    setConfirmItem(item);
  };

  return (
    <MuiModalDowngrade
      headerName={null}
      isHideCloseBtn={false}
      maxWidth="sm"
      headerWithIcon={{
        title: t('garageNew.chooseVehicleModel.title'),
        subtitle: t('garageNew.chooseVehicleModel.subtitle'),
        icon: <InfoSVG />,
      }}
      isShow={!!isOpen}
      onClose={onClose}
    >
      <Box py="16px">
        {props?.vehicles?.map((vehicle: Vehicles) => {
          return (
            <ItemContainer
              isMobile={isMobile}
              key={vehicle.vin}
              sx={{ background: vehicle.make === check ? theme.palette.case.primary.p50 : 'transparent' }}
            >
              <Box>
                <MuiRadioButton
                  value={vehicle.make}
                  checked={vehicle.make === check}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handlerChangeCheck(e, vehicle)}
                />
              </Box>
              <Box display="flex">
                <TextBlockContainer width={isMobile ? '56px' : '80px'}>
                  <Typography sx={{ color: theme.palette.case.neutral.n500 }} variant="t12r">
                    {t('garageNew.chooseVehicleModel.year')}
                  </Typography>
                  <Typography sx={{ color: theme.palette.case.neutral.n800 }} variant="t14r">
                    {vehicle.year}
                  </Typography>
                </TextBlockContainer>
                <Box display="flex" flexDirection="column" width={isMobile ? '85px' : '160px'}>
                  <Typography sx={{ color: theme.palette.case.neutral.n500 }} variant="t12r">
                    {t('garageNew.chooseVehicleModel.make')}
                  </Typography>
                  <TextWrapper width={isMobile ? '80px' : '160px'}>
                    <Typography sx={{ color: theme.palette.case.neutral.n800 }} variant="t14r">
                      {vehicle.make}
                    </Typography>
                  </TextWrapper>
                </Box>
                <TextBlockContainer width={isMobile ? '115px' : '240px'}>
                  <Typography sx={{ color: theme.palette.case.neutral.n500 }} variant="t12r">
                    {t('garageNew.chooseVehicleModel.model')}
                  </Typography>
                  <TextWrapper width={isMobile ? '116px' : '240px'}>
                    <Typography sx={{ color: theme.palette.case.neutral.n800 }} variant="t14r">
                      {vehicle.model}
                    </Typography>
                  </TextWrapper>
                </TextBlockContainer>
              </Box>
            </ItemContainer>
          );
        })}
      </Box>

      <ModalFooter
        isShow
        isSpaceBetweenBtn={isMobile}
        rightBtnProps={{
          isShow: true,
          label: t('general.buttons.choose'),
          fullWidth: isMobile,
          variant: 'contained',
          onClick: handleConfirm,
        }}
        middleBtnProps={{
          isShow: true,
          label: t('general.buttons.Cancel'),
          fullWidth: isMobile,
          onClick: onClose,
        }}
      />
    </MuiModalDowngrade>
  );
};

export default ChooseInsuranceModal;
