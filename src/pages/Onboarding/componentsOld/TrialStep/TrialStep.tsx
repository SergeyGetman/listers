import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';

import OnboardingLayout from '../OnboardingLayout';
import { ReactComponent as HubmeekIcon } from '../../../../assets/Images/hubbmeek/hubmeek-hi.svg';
import MuiButton from '../../../../components/buttons/MuiButton';
import { PlanModel } from '../../../../shared/models/plans.model';

type Props = { useTrial: () => void; selectedPlan: PlanModel; isFullWidth?: boolean };
const TrialStep: FC<Props> = ({ useTrial, selectedPlan, isFullWidth }) => {
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <OnboardingLayout
      step={7}
      isFullWidth={isFullWidth}
      isShowStep={false}
      title={`I saw you hesitated,
        so here’s a 7-day ${selectedPlan.name} free trial for you.`}
      totalSteps={0}
      isFooter={false}
      minHeight={600}
    >
      <Box>
        <Box mb="36px" display="flex" alignItems="center" justifyContent="center" mt="36px">
          <HubmeekIcon />
        </Box>
        <Box
          width={matchSm ? '100%' : '50%'}
          margin="0 auto"
          display="flex"
          alignItems="center"
          justifyContent={matchSm ? 'center' : 'center'}
        >
          <MuiButton variant="contained" label="Use my trial" onClick={useTrial} />
        </Box>
        <Box mt="36px">
          <Typography sx={{ color: theme.palette.case.neutral.n700 }} variant="large">
            By clicking <Typography variant="large_bolt">“Use my trial”</Typography>, you agree that in 7
            days, {selectedPlan.amount / 100}$ will be automatically charged from your account if you don’t
            cancel.
          </Typography>
        </Box>
      </Box>
    </OnboardingLayout>
  );
};

export default TrialStep;
