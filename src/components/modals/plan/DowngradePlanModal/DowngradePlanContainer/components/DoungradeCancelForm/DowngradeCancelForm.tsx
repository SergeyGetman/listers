import React, { FC } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Hubmeek } from '../../../../../../../assets/Images/hubbmeek/hubmeek-sad.svg';
import DowngradeFormsContainer from '../DowngradeFormsContainer';
import { PlanModel } from '../../../../../../../shared/models/plans.model';
import { ProfileModel } from '../../../../../../../shared/models/profile/profile.model';

type Props = {
  onClose: () => void;
  downgradePlan: PlanModel | null;
  currentSubscription: ProfileModel['subscription'] | null;
};

const DowngradeCancelForm: FC<Props> = ({ onClose, downgradePlan, currentSubscription }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  return (
    <DowngradeFormsContainer
      title={t('plans.downgrade.title')}
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
            <Typography variant="h3">
              {t('plans.downgrade.step5.subtitle1', {
                subscription: currentSubscription?.name,
              })}
            </Typography>
          </Box>
          <Box>
            <Typography variant="large" component="span">
              {t('plans.downgrade.step5.subtitle2')}
              <Typography variant="large_bolt" component="span">
                {downgradePlan ? `${downgradePlan.name}!` : t('plans.downgrade.step5.starter')}
              </Typography>{' '}
              {t('plans.downgrade.step5.subtitle3', {
                subscription: currentSubscription?.name,
              })}
              <Typography
                sx={{
                  whiteSpace: 'nowrap',
                }}
                variant="large_bolt"
                component="span"
              >
                {' '}
                {moment(currentSubscription?.real_package_end).format('MM.DD.YYYY')}
              </Typography>
            </Typography>
          </Box>
        </Box>
        <Box
          width={isMobile ? '100%' : '30%'}
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

export default DowngradeCancelForm;
