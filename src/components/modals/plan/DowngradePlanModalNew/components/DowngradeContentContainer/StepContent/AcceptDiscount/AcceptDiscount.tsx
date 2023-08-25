import React, { FC } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { ReactComponent as HubmeekHappy } from '../../../../../../../../assets/Images/hubbmeek/hubmeek-happy.svg';
import { useAppSelector } from '../../../../../../../../shared/hooks/redux';
import { getCurrentSubscriptionSelector } from '../../../DowngradeContainer/selector/selectors';
import DowngradeContentContainer from '../../DowngradeContentContainer';
import { SupportHubmeeChat } from '../AcceptDowgrade/SupportHubmeeChatLink/SupportHubmeeChat';

type PropsType = {
  onClose: () => void;
};

const AcceptDiscount: FC<PropsType> = ({ onClose }) => {
  const subscription = useAppSelector(getCurrentSubscriptionSelector);
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
        position="relative"
        justifyContent="space-between"
        width="100%"
        px={isMobile ? '16px' : '24px'}
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <Box display="flex" flexDirection="column" gap="12px" py={isMobile ? '24px' : '40px'}>
          <Typography variant="h2" component="span" sx={{ color: theme.palette.case.neutral.n800 }}>
            {t('plans.downgrade.discountOffer.content.trust')}
          </Typography>

          <Box width="100%" display="flex" flexDirection="column">
            <Typography variant="t14r" component="span" sx={{ color: theme.palette.case.neutral.n700 }}>
              {t('plans.downgrade.discountOffer.content.valid')}
              <Typography
                mx="4px"
                variant="t14r"
                component="span"
                sx={{ color: theme.palette.case.neutral.n700 }}
              >
                {moment(subscription?.real_package_end).format('MM.DD.YYYY')}.
              </Typography>
            </Typography>

            <Typography component="span" variant="t14r" sx={{ color: theme.palette.case.neutral.n700 }}>
              {t('plans.downgrade.discountOffer.content.only')}
              <Typography
                variant="s1"
                component="span"
                ml="3px"
                sx={{ color: theme.palette.case.primary.p700 }}
              >
                ${subscription?.amount ? subscription.amount / 2 / 100 : ''}
              </Typography>
              <Typography
                mx="4px"
                sx={{ textDecoration: 'line-through', color: theme.palette.case.neutral.n600 }}
                component="span"
                variant="t12r"
              >
                ${subscription?.amount ? subscription.amount / 100 : ''}
              </Typography>
              {t('plans.downgrade.discountOffer.content.nextMonth')}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" mt={isMobile ? '40px' : '0'} px={isMobile ? '0' : '60px'}>
          <HubmeekHappy />
        </Box>
      </Box>
      <SupportHubmeeChat onClose={onClose} />
    </DowngradeContentContainer>
  );
};

export default AcceptDiscount;
