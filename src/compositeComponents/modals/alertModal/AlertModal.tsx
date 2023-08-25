import React, { ReactNode } from 'react';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import MuiModalDowngrade from '../../../components/modalsElements/containers/MuiModalDowngrade/MuiModalDowngrade';
import modalObserver, { ModalProps } from '../../../shared/utils/observers/modalObserver';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';
import ModalFooter from '../../../components/modalsElements/containers/Footer/ModalFooter';
import { ReactComponent as WarningIcon } from '../../../assets/Images/alertsIcon/Warning.svg';
import { ReactComponent as DoneIcon } from '../../../assets/Images/alertsIcon/Done.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/Images/alertsIcon/Delete.svg';
import { ContentContainerAlertModal, TextContainerAlertModal } from './AlertModal.style';

type VariantType = 'warning' | 'delete' | 'done';
type VariantIcon = { [Key in VariantType]: ReactNode };
const variantIcon: VariantIcon = {
  warning: <WarningIcon />,
  delete: <DeleteIcon />,
  done: <DoneIcon />,
};

const AlertModal = ({ isOpen, props }: ModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const chooseVariantIcon = props?.modalContent.variantIcon as VariantType;

  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.alertModal);
  };

  return (
    <MuiModalDowngrade headerName={props?.modalContent.header} isShow={!!isOpen} onClose={onClose}>
      <ContentContainerAlertModal isMobile={isMobile}>
        {variantIcon[chooseVariantIcon || 'done']}
        <TextContainerAlertModal isMobile={isMobile}>
          <Typography
            variant={isMobile ? 's2' : 's1'}
            sx={{ color: theme.palette.case.neutral.n900, textAlign: 'center' }}
          >
            {props?.modalContent.title}
          </Typography>
          <Typography sx={{ textAlign: 'center', color: theme.palette.case.neutral.n700 }} variant="t14r">
            {props?.modalContent.subtitle}
          </Typography>
        </TextContainerAlertModal>
      </ContentContainerAlertModal>

      <ModalFooter
        isShow={props?.modalContent.isShowFooter}
        isBorderTop={props?.modalContent.isShowBorderTop || false}
        isShowSecurityInfo={false}
        position={props?.modalContent.position || 'sticky'}
        isSpaceBetweenBtn={isMobile}
        isShowBackGround={isMobile}
        rightBtnProps={{ fullWidth: isMobile, variant: 'contained', ...props?.rightBtnProps }}
        middleBtnProps={{
          onClick: onClose,
          fullWidth: isMobile,
          variant: 'outlined',
          ...props?.leftBtnProps,
        }}
      />
    </MuiModalDowngrade>
  );
};
export default AlertModal;
