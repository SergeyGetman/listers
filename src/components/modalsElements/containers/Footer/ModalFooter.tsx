import React, { FC, memo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MuiButton from '../../../buttons/MuiButton';
import { MuiButtonProps } from '../../../buttons/MuiButton/MuiButton';
import { ReactComponent as SecurityIcon } from '../../../../assets/Images/security.svg';
import { FooterSecurityContainer, ModalFooterContainer } from './ModalFooter.style';
import MuiLoadingButton from '../../../buttons/MuiLoadingButton';
import MuiTooltip from '../../../MuiTooltip';

type ModalFooterBtnType = MuiButtonProps & {
  isShow: boolean;
  isLoadingBtn?: boolean;
  loading?: boolean;
  tooltipText?: string;
  fullWidth?: boolean;
  tooltipColor?: 'light' | 'dark';
};

export type ModalFooterProps = {
  rightBtnProps?: ModalFooterBtnType;
  middleBtnProps?: ModalFooterBtnType;
  isSpaceBetweenBtn?: boolean;
  isShow?: boolean;
  isBottomRounded?: boolean;
  isShowSecurityInfo?: boolean;
  isBoxShadow?: boolean;
  position?: 'initial' | 'absolute' | 'fixed' | 'sticky';
  isShowBackGround?: boolean;
  isBorderTop?: boolean;
};

const ModalFooterBtn = ({
  isShow,
  isLoadingBtn,
  fullWidth,
  tooltipColor = 'light',
  ...rest
}: ModalFooterBtnType): JSX.Element | null => {
  if (!isShow) return null;

  return (
    <Box sx={{ marginLeft: '10px', width: fullWidth ? '100%' : 'auto' }}>
      {isLoadingBtn ? (
        <MuiTooltip title={rest?.tooltipText || ''} color={tooltipColor}>
          <Box component="span">
            <MuiLoadingButton fullWidth={fullWidth} {...rest} />
          </Box>
        </MuiTooltip>
      ) : (
        <MuiTooltip title={rest?.tooltipText || ''} color={tooltipColor}>
          <Box>
            <MuiButton fullWidth={fullWidth} {...rest} />
          </Box>
        </MuiTooltip>
      )}
    </Box>
  );
};

const ModalFooter: FC<ModalFooterProps> = ({
  isShow = true,
  isShowSecurityInfo = false,
  isSpaceBetweenBtn = false,
  rightBtnProps = { isShow: false },
  middleBtnProps = { isShow: false },
  isBottomRounded = false,
  isBoxShadow = true,
  position = 'sticky',
  isShowBackGround = true,
  isBorderTop = false,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return isShow ? (
    <ModalFooterContainer
      className="modal-footer"
      isBottomRounded={isBottomRounded}
      footerPosition={position}
      isBoxShadow={isBoxShadow}
      isBorderTop={isBorderTop}
      isShowBackGround={isShowBackGround}
    >
      <FooterSecurityContainer>
        {isShowSecurityInfo && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SecurityIcon />
            <Typography sx={{ marginLeft: '10px' }} variant="extra_small">
              {t('general.modals.securityText')}
            </Typography>
          </Box>
        )}
      </FooterSecurityContainer>

      <Box
        sx={{
          display: 'flex',
          justifyContent: isSpaceBetweenBtn ? 'space-between' : 'unset',
          width: isSpaceBetweenBtn ? '100%' : 'unset',
          [theme.breakpoints.down('sm')]: {
            justifyContent: isSpaceBetweenBtn ? 'center' : 'unset',
          },
        }}
      >
        {middleBtnProps?.isShow && <ModalFooterBtn {...middleBtnProps} />}
        {rightBtnProps.isShow && <ModalFooterBtn {...rightBtnProps} />}
      </Box>
    </ModalFooterContainer>
  ) : null;
};

export default memo(ModalFooter);
