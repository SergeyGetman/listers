import React, { FC } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import moment from 'moment/moment';
import { useTranslation } from 'react-i18next';
import { ReactComponent as HubmeekSad } from '../../../../../../../../assets/Images/hubbmeek/hubmeek-sad.svg';
import DowngradeContentContainer from '../../DowngradeContentContainer';
import { useAppSelector } from '../../../../../../../../shared/hooks/redux';
import { getCurrentSubscriptionSelector } from '../../../DowngradeContainer/selector/selectors';

type PropsType = {
  downgradePlanName: string;
  onClose: () => void;
};

const AcceptDowngrade: FC<PropsType> = ({ downgradePlanName, onClose }) => {
  const currentSubscription = useAppSelector(getCurrentSubscriptionSelector);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  return (
    <DowngradeContentContainer
      title=""
      isShowTitle={false}
      rightBtnProps={{
        isShow: true,
        label: t('plans.button.gotIt'),
        onClick: onClose,
        variant: 'contained',
        fullWidth: isMobile,
        type: 'button',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        px={isMobile ? '16px' : '24px'}
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <Box display="flex" flexDirection="column" gap="12px" py={isMobile ? '24px' : '40px'}>
          <Typography variant="h2" component="span" sx={{ color: theme.palette.case.neutral.n800 }}>
            {t('plans.downgrade.acceptDowngrade.content.enjoy')}
            <Typography
              variant="h2"
              component="span"
              mx="4px"
              sx={{ color: theme.palette.case.primary.p700 }}
            >
              {t('plans.downgrade.acceptDowngrade.content.downgradeName', {
                downgradeName: downgradePlanName,
              })}
            </Typography>
            {t('plans.downgrade.acceptDowngrade.content.features')}
          </Typography>

          <Box maxWidth="250px" width="100%">
            <Typography variant="t14r" component="span" sx={{ color: theme.palette.case.neutral.n700 }}>
              {t('plans.downgrade.acceptDowngrade.content.planTill', {
                subscription: currentSubscription?.name,
              })}
              <Typography
                mx="4px"
                variant="s3"
                component="span"
                sx={{ color: theme.palette.case.neutral.n700 }}
              >
                {moment(currentSubscription?.real_package_end).format('MM.DD.YYYY')}
              </Typography>
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" mt={isMobile ? '40px' : '0'}>
          <HubmeekSad />
        </Box>
      </Box>
    </DowngradeContentContainer>
  );
};

export default AcceptDowngrade;
