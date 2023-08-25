import React, { FC } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import moment from 'moment/moment';
import { ReactComponent as Hubmeek } from '../../../../../../../assets/Images/hubbmeek/hubmeek-happy.svg';
import DowngradeFormsContainer from '../../../../DowngradePlanModal/DowngradePlanContainer/components/DowngradeFormsContainer';
import { useAppSelector } from '../../../../../../../shared/hooks/redux';

type Props = {
  onClose: () => void;
};

const UpgradePlanSuccess: FC<Props> = ({ onClose }) => {
  const profile = useAppSelector((state) => state.profile.data);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <DowngradeFormsContainer
      title="Hooray!"
      isStepper={false}
      onClose={onClose}
      rightBtnProps={{
        isShow: true,
        label: 'Got it!',
        variant: 'contained',
        onClick: onClose,
        isStopPropagation: false,
      }}
    >
      <Box
        display="flex"
        sx={{
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <Box mr={isMobile ? 0 : '24px'} display="flex" justifyContent="center" flexDirection="column">
          <Box mb="16px">
            <Typography variant="h3">Thank you for your trust</Typography>
          </Box>
          <Box mb="24px">
            <Typography variant="large" component="span">
              From now on, you will enjoy using the
              <Typography variant="large_bolt" component="span">
                {' '}
                {profile?.subscription?.name}{' '}
              </Typography>
              plan and watch you grow every next day.
            </Typography>
          </Box>
          <Box>
            <Box
              height="1px"
              width="100%"
              sx={{
                // FIXME bg
                background: '#F2EDED',
              }}
            />
            <Box display="flex" p="16px" justifyContent="space-between">
              <Box>
                <Typography variant="default">Your next payment date</Typography>
              </Box>
              <Box>
                <Typography variant="default">
                  {moment(profile?.subscription?.real_package_end).format('MM.DD.YYYY')}
                </Typography>
              </Box>
            </Box>
            <Box
              height="1px"
              width="100%"
              sx={{
                background: '#F2EDED',
              }}
            />
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

export default UpgradePlanSuccess;
