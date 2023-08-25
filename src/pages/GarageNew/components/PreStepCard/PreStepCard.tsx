import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import ModalFooter from '../../../../components/modalsElements/containers/Footer/ModalFooter';
import { MuiButtonProps } from '../../../../components/buttons/MuiButton/MuiButton';
import { IconContainer, PreStepContentContainer, PreStepWrapper } from './PreStepCard.style';

type FooterPropsType = MuiButtonProps & {
  isShow: boolean;
  isLoadingBtn?: boolean;
  loading?: boolean;
  tooltipText?: string;
  fullWidth?: boolean;
};

type VariantItem = {
  icon: ReactNode;
  title: string;
  subtitle: string;
};

type PropsType = {
  isShowFooter?: boolean;
  rightBtnProps?: FooterPropsType;
  middleBtnProps?: FooterPropsType;
  header?: string | null;
  variantItem: VariantItem;
  children: ReactNode;
};

export const PreStepCard: FC<PropsType & PropsWithChildren<any>> = ({
  children,
  rightBtnProps,
  middleBtnProps,
  isShowFooter = true,
  header,
  variantItem,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box position="relative" width="100%">
      {header !== null && (
        <Box width="100%" display="flex" justifyContent="center" mb="24px">
          <Typography
            sx={{
              color: theme.palette.case.neutral.n700,
              textAlign: 'center',
              width: isMobile ? '290px' : 'auto',
            }}
            variant={isMobile ? 's1' : 'h3'}
          >
            {header}
          </Typography>
        </Box>
      )}
      <PreStepWrapper>
        <PreStepContentContainer isMobile={isMobile}>
          <IconContainer>{variantItem.icon}</IconContainer>
          <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
            <Typography variant={isMobile ? 's3' : 's2'} sx={{ color: theme.palette.case.neutral.n600 }}>
              {variantItem.title}
            </Typography>

            <Typography
              variant={isMobile ? 't12r' : 't14r'}
              sx={{ color: theme.palette.case.neutral.n500, textAlign: 'start' }}
            >
              {variantItem.subtitle}
            </Typography>
          </Box>
        </PreStepContentContainer>
        <Box padding={isMobile ? '16px' : '16px 24px'}>{children}</Box>

        <ModalFooter
          isBoxShadow={false}
          isShowSecurityInfo={false}
          isShow={isShowFooter}
          position={isMobile ? 'fixed' : 'sticky'}
          isSpaceBetweenBtn={isMobile}
          isShowBackGround={isMobile}
          rightBtnProps={{
            type: rightBtnProps?.type || 'button',
            isShow: rightBtnProps?.isShow || false,
            onClick: rightBtnProps?.onClick,
            variant: rightBtnProps?.variant,
            label: rightBtnProps?.label || 'Button',
            fullWidth: isMobile,
            isDisabled: rightBtnProps?.isDisabled || false,
            isLoadingBtn: rightBtnProps?.isLoadingBtn || false,
            isStopPropagation: rightBtnProps?.isStopPropagation || false,
          }}
          middleBtnProps={{
            type: middleBtnProps?.type || 'button',
            isShow: middleBtnProps?.isShow || false,
            onClick: middleBtnProps?.onClick,
            variant: middleBtnProps?.variant,
            label: middleBtnProps?.label || 'Button',
            fullWidth: isMobile,
            isDisabled: middleBtnProps?.isDisabled || false,
            isLoadingBtn: middleBtnProps?.isLoadingBtn || false,
            isStopPropagation: middleBtnProps?.isStopPropagation || false,
          }}
        />
      </PreStepWrapper>
    </Box>
  );
};
