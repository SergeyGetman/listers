import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { OnboardingLayoutContainer, QuoteContainer } from './OnboardingLayout.styled';
import { ReactComponent as Logo } from '../../../../assets/Images/logo.svg';
import MuiButton from '../../../../components/buttons/MuiButton';
import MuiTooltip from '../../../../components/MuiTooltip';
import MuiLoadingButton from '../../../../components/buttons/MuiLoadingButton';
import { MuiButtonProps } from '../../../../components/buttons/MuiButton/MuiButton';
import { ReactComponent as CloseIcon } from '../../../../assets/Images/modalNavigation/close.svg';

type ButtonsType = MuiButtonProps & {
  isShow: boolean;
  isLoadingBtn?: boolean;
  loading?: boolean;
  tooltipText?: string;
};

type PropsType = {
  children: React.ReactNode;
  rightBtnProps: ButtonsType;
  leftBtnProps?: ButtonsType;
  title?: string;
  subtitle?: string;
  step?: number;
  totalSteps?: number;
  quoteText?: string;
  quoteAuthor?: string;
  quoteIcon?: React.ReactNode;
  maxWidth?: number;
  minHeight?: number;
  logoPosition?: 'inside' | 'outside';
  isShowLogo?: boolean;
  isHidePadding?: boolean;
  isShowTitleCloseBtn?: boolean;
  handleTitleCloseBtn?: () => void;
};

const OnboardingLayout: FC<PropsType> = ({
  children,
  rightBtnProps,
  subtitle,
  title,
  step,
  totalSteps,
  quoteText,
  quoteAuthor,
  quoteIcon,
  leftBtnProps,
  maxWidth = 640,
  minHeight = 700,
  logoPosition = 'inside',
  isShowLogo = true,
  isHidePadding = false,
  isShowTitleCloseBtn = false,
  handleTitleCloseBtn,
}) => {
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { sx: '0px', sm: isHidePadding ? '0' : '20px 0' },
        width: '100%',
        height: '100%',
      }}
    >
      {logoPosition === 'outside' && !matchSm && isShowLogo && (
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
            {!!(step && totalSteps) && (
              <Typography variant="large" sx={{ color: theme.palette.case.neutral.n700 }}>
                {step}/{totalSteps}
              </Typography>
            )}
          </Box>
        </Box>
      )}

      <OnboardingLayoutContainer isFullWidth={false} maxWidth={maxWidth} minHeight={minHeight}>
        {logoPosition === 'inside' ? (
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
              {!!(step && totalSteps) && (
                <Typography variant="large" sx={{ color: theme.palette.case.neutral.n700 }}>
                  {step}/{totalSteps}
                </Typography>
              )}
            </Box>
          </Box>
        ) : (
          <Box
            p={matchSm ? '13px 16px' : '18px 24px'}
            display="flex"
            alignItems="center"
            sx={{ borderBottom: `1px solid ${theme.palette.case.neutral.n200}` }}
            justifyContent="space-between"
          >
            {title && (
              <Box alignItems="center" width="100%" display="flex" justifyContent="space-between">
                <Typography variant="h2" sx={{ color: theme.palette.case.neutral.n900 }}>
                  {title}
                </Typography>
                {isShowTitleCloseBtn && (
                  <Box
                    onClick={() => (handleTitleCloseBtn ? handleTitleCloseBtn() : true)}
                    sx={{ padding: '4px', cursor: 'pointer' }}
                  >
                    <CloseIcon />
                  </Box>
                )}
              </Box>
            )}
          </Box>
        )}

        <Box
          flexGrow={1}
          p={matchSm ? '0px 16px 16px' : '0px 36px 24px'}
          display="flex"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
          }}
          flexDirection="column"
        >
          {quoteText && (
            <QuoteContainer mb="24px">
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
            <Box>
              <Box>
                {subtitle && (
                  <Typography mb="8px" variant="subtitle1" sx={{ color: theme.palette.case.neutral.n700 }}>
                    {subtitle}
                  </Typography>
                )}
              </Box>
              {title && logoPosition === 'inside' && (
                <Box mb="16px">
                  <Typography variant="h2" sx={{ color: theme.palette.case.neutral.n900 }}>
                    {title}
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {children}
        </Box>

        <Box
          sx={{
            borderTop: `1px solid ${theme.palette.case.neutral.n200}`,
            height: 75,
            display: 'flex',
            p: matchSm ? '16px' : '16px 36px',
          }}
        >
          <Box width="100%" display="flex" sx={{ justifyContent: matchSm ? 'space-around' : 'flex-end' }}>
            {leftBtnProps && leftBtnProps.isShow && (
              <Box sx={{ width: matchSm ? '100%' : 'initial' }}>
                <MuiButton {...leftBtnProps} fullWidth={matchSm} />
              </Box>
            )}
            {rightBtnProps?.isShow && (
              <Box sx={{ marginLeft: '24px', width: matchSm ? '100%' : 'initial' }}>
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
      </OnboardingLayoutContainer>
    </Box>
  );
};

export default OnboardingLayout;
