import React, { FC } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DowngradeContentContainer from '../../DowngradeContentContainer';
import { ReactComponent as HubmeekHappy } from '../../../../../../../../assets/Images/hubbmeek/hubmeek-happy.svg';

type PropsType = {
  onClose: () => void;
};

const SuccessBookDemo: FC<PropsType> = ({ onClose }) => {
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
      }}
    >
      <Box
        px={isMobile ? '16px' : '0'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: isMobile ? 'flex-start' : 'center',
          width: '100%',
        }}
      >
        <Typography variant={isMobile ? 'h2' : 'h1'} sx={{ color: theme.palette.case.neutral.n800 }}>
          {t('plans.downgrade.successBook.content.trust')}
        </Typography>
        <Typography mt="8px" sx={{ color: theme.palette.case.neutral.n800 }} variant="s1">
          {t('plans.downgrade.successBook.content.meetingYou')}
        </Typography>
        <Typography mt="4px" sx={{ color: theme.palette.case.neutral.n800 }} variant="s3">
          {t('plans.downgrade.successBook.content.contact')}
        </Typography>
      </Box>
      <Box mt={isMobile ? '64px' : '32px'}>
        <HubmeekHappy />
      </Box>
    </DowngradeContentContainer>
  );
};

export default SuccessBookDemo;
