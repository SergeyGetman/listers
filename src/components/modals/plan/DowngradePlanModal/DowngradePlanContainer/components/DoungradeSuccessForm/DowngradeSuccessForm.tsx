import React, { FC } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DowngradeFormsContainer from '../DowngradeFormsContainer';
import { ReactComponent as Hubmeek } from '../../../../../../../assets/Images/hubbmeek/hubmeek-happy.svg';
import { useAppSelector } from '../../../../../../../shared/hooks/redux';

type Props = {
  onClose: () => void;
};

const DowngradeSuccessForm: FC<Props> = ({ onClose }) => {
  const profile = useAppSelector((state) => state.profile.data);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  return (
    <DowngradeFormsContainer
      title={t('plans.downgrade.step4.title')}
      isStepper={false}
      onClose={onClose}
      rightBtnProps={{
        isShow: true,
        label: t('plans.button.confirm'),
        variant: 'contained',
        onClick: onClose,
        isStopPropagation: false,
      }}
    >
      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'}>
        <Box mr={isMobile ? 0 : '24px'} display="flex" justifyContent="center" flexDirection="column">
          <Box mb="16px">
            <Typography variant="h3">{t('plans.downgrade.step4.subtitle1')}</Typography>
          </Box>
          <Box>
            <Typography variant="large" component="span">
              {/* TODO: add localization */}
              Your discount will be valid from{' '}
              <Typography variant="large_bolt" component="span">
                {profile?.subscription?.name}
              </Typography>
              . Only{' '}
              <Typography variant="large_bolt" component="span">
                ${profile?.subscription?.amount ? profile.subscription.amount / 2 / 100 : ''}
              </Typography>{' '}
              <Typography
                variant="large"
                sx={{
                  textDecoration: 'line-through',
                }}
                component="span"
              >
                ${profile?.subscription?.amount ? profile.subscription.amount / 100 : ''}
              </Typography>{' '}
              for the next month to know hubmee better.
            </Typography>
          </Box>
        </Box>
        <Box
          width={isMobile ? '100%' : '40%'}
          mt={isMobile ? '16px' : 0}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Hubmeek />
        </Box>
      </Box>
    </DowngradeFormsContainer>
  );
};

export default DowngradeSuccessForm;
