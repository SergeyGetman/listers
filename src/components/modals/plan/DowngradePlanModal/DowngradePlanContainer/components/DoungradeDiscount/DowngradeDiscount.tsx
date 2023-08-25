import React, { FC } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DowngradeFormsContainer from '../DowngradeFormsContainer';
import downgradeDiscountImage from '../../../../../../../assets/Images/downgradeDiscount.png';
import { useAppSelector } from '../../../../../../../shared/hooks/redux';

type Props = {
  cancelPlan: () => void;
  submitDiscount: () => void;
  back: () => void;
  countStep: number;
  onClose: () => void;
};

const DowngradeDiscount: FC<Props> = ({ cancelPlan, submitDiscount, back, countStep, onClose }) => {
  const theme = useTheme();
  const profile = useAppSelector((state) => state.profile.data);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  return (
    <DowngradeFormsContainer
      title={t('plans.downgrade.title')}
      countSteps={countStep}
      onClose={onClose}
      step={3}
      rightBtnProps={{
        isShow: true,
        label: t('plans.button.discount'),
        variant: 'contained',
        onClick: submitDiscount,
        isStopPropagation: false,
      }}
      middleBtnProps={{ isShow: true, label: t('plans.button.cancel'), type: 'button', onClick: cancelPlan }}
      leftBtnProps={{
        isShow: true,
        label: 'Back',
        onClick: back,
        startIcon: <ArrowBackIcon />,
      }}
    >
      <Box>
        <Box mb="16px">
          <Typography variant="large_bolt">{t('plans.downgrade.step3.subtitle1')}</Typography>
        </Box>
        <Box mb="16px">
          <Typography variant="default">{t('plans.downgrade.step3.subtitle2')}</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-around"
          sx={{
            flexDirection: isMobile ? 'column' : 'row',
          }}
          alignItems="center"
        >
          <Box
            sx={{
              width: isMobile ? '100%' : 360,
              height: 170,
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
            }}
          >
            <Box>
              <Box>
                <Typography variant="h1">{t('plans.downgrade.step3.discount')}</Typography>
              </Box>
              <Box mr="30px">
                <Typography
                  sx={{
                    color: theme.palette.case.neutral.n700,
                  }}
                  variant="large"
                >
                  {t('plans.downgrade.step3.subtitle3')}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                img: {
                  width: 140,
                  height: 140,
                },
              }}
            >
              <img src={downgradeDiscountImage} alt="downgrade" />
            </Box>
          </Box>
          <Box
            sx={{
              maxWidth: isMobile ? '100%' : 210,
              marginTop: isMobile ? '16px' : 0,
            }}
          >
            <Typography variant="large" component="span">
              {/* TODO: add localization */}
              Enjoy{' '}
              <Typography component="span" variant="large_bolt">
                {profile?.subscription?.name}
              </Typography>{' '}
              in hubmee paying only for half the price.
            </Typography>
          </Box>
        </Box>
      </Box>
    </DowngradeFormsContainer>
  );
};

export default DowngradeDiscount;
