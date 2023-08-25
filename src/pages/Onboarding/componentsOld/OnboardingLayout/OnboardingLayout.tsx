import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { CloseBtnContainer, OnboardingLayoutContainer, QuoteContainer } from './OnboardingLayout.styled';
import { ReactComponent as Logo } from '../../../../assets/Images/logo.svg';
import MuiButton from '../../../../components/buttons/MuiButton';
import MuiTooltip from '../../../../components/MuiTooltip';
import MuiLoadingButton from '../../../../components/buttons/MuiLoadingButton';
import { MuiButtonProps } from '../../../../components/buttons/MuiButton/MuiButton';
import NavigationButton from '../../../../components/buttons/NavigationButton';

type ButtonsType = MuiButtonProps & {
  isShow: boolean;
  isLoadingBtn?: boolean;
  loading?: boolean;
  tooltipText?: string;
};

type Props = {
  children: React.ReactNode;
  middleBtnProps?: ButtonsType;
  rightBtnProps?: ButtonsType;
  leftBtnProps?: ButtonsType;
  title?: string;
  subtitle?: string;
  step: number;
  totalSteps: number;
  isShowStep?: boolean;
  quoteText?: string;
  quoteAuthor?: string;
  quoteIcon?: React.ReactNode;
  maxWidth?: number;
  minHeight?: number;
  isFullWidth?: boolean;
  isFooter?: boolean;
  isOverflow?: boolean;
  isCloseBtn?: boolean;
  onCloseClick?: () => void;
};

const OnboardingLayout: FC<Props> = ({
  children,
  middleBtnProps,
  rightBtnProps,
  subtitle,
  title,
  step,
  totalSteps,
  isShowStep = true,
  quoteText,
  quoteAuthor,
  quoteIcon,
  maxWidth = 648,
  minHeight = 700,
  isFullWidth,
  isFooter = true,
  isOverflow = true,
  leftBtnProps,
  isCloseBtn = false,
  onCloseClick,
}) => {
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <OnboardingLayoutContainer isFullWidth={isFullWidth} maxWidth={maxWidth} minHeight={minHeight}>
      <Box
        mb="16px"
        p={matchSm ? '24px 16px 0px' : '24px 36px 0px'}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Logo />
        </Box>

        <Box>
          {isShowStep && (
            <Typography variant="large" sx={{ color: theme.palette.case.neutral.n700 }}>
              {step}/{totalSteps}
            </Typography>
          )}
        </Box>
      </Box>

      {isCloseBtn && (
        <CloseBtnContainer>
          <NavigationButton onClick={() => onCloseClick?.()} size="large" type="close" />
        </CloseBtnContainer>
      )}

      <Box
        flexGrow={1}
        p={matchSm ? '0px 16px 16px' : '0px 36px 36px'}
        display="flex"
        overflow={isOverflow ? 'auto' : 'initial'}
        flexDirection="column"
      >
        {quoteText && (
          <QuoteContainer mb="36px">
            <Box display="flex">
              <Box>{quoteIcon}</Box>
              <Box ml="10px">
                <Typography variant="large" sx={{ color: theme.palette.case.neutral.n700 }}>
                  {quoteText}
                </Typography>
              </Box>
            </Box>
            {quoteAuthor && (
              <Box mt="10px" display="flex" justifyContent="flex-end">
                <Typography variant="large_bolt" sx={{ color: theme.palette.case.neutral.n700 }}>
                  {quoteAuthor}
                </Typography>
              </Box>
            )}
          </QuoteContainer>
        )}

        {(title || subtitle) && (
          <Box mb="16px">
            <Box mb="8px">
              {subtitle && (
                <Typography variant="subtitle1" sx={{ color: theme.palette.case.neutral.n700 }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
            {title && (
              <Box>
                <Typography variant="h2" sx={{ color: theme.palette.case.neutral.n900 }}>
                  {title}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {children}
      </Box>

      {isFooter && (
        <Box
          sx={{
            borderTop: `1px solid ${theme.palette.case.neutral.n200}`,
            height: 75,
            display: 'flex',
            p: matchSm ? '16px' : '16px 36px',
          }}
        >
          {leftBtnProps && leftBtnProps.isShow && (
            <Box sx={{ width: matchSm ? '100%' : 'initial', mr: '16px' }}>
              <MuiButton {...leftBtnProps} fullWidth={matchSm} />
            </Box>
          )}
          <Box width="100%" display="flex" sx={{ justifyContent: matchSm ? 'space-around' : 'flex-end' }}>
            {middleBtnProps?.isShow && (
              <Box sx={{ width: matchSm ? '100%' : 'initial' }}>
                <MuiButton {...middleBtnProps} fullWidth={matchSm} />
              </Box>
            )}
            {rightBtnProps?.isShow && (
              <Box
                sx={{ marginLeft: middleBtnProps?.isShow ? '24px' : 0, width: matchSm ? '100%' : 'initial' }}
              >
                {rightBtnProps.isLoadingBtn ? (
                  <MuiTooltip title={rightBtnProps?.tooltipText || ''}>
                    <MuiLoadingButton {...rightBtnProps} fullWidth={matchSm} />
                  </MuiTooltip>
                ) : (
                  <MuiTooltip title={rightBtnProps?.tooltipText || ''}>
                    <Box>
                      <MuiButton {...rightBtnProps} fullWidth={matchSm} />
                    </Box>
                  </MuiTooltip>
                )}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </OnboardingLayoutContainer>
  );
};

export default OnboardingLayout;
