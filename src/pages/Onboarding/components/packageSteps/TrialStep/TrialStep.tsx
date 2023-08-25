import { Box, Typography, useTheme } from '@mui/material';
import React, { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ReactComponent as HubmeekIcon } from '../../../../../assets/Images/hubbmeek/hubmeek-hi.svg';
import { PlanModel } from '../../../../../shared/models/plans.model';

type Props = { selectedPlan: PlanModel };

const TrialStep: FC<Props> = ({ selectedPlan }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box sx={{ mt: '24px' }}>
      <Typography variant="h2" sx={{ color: theme.palette.case.neutral.n700 }}>
        {t('onboarding.trialStep.title', { package: selectedPlan.name })
          .split('\n')
          .map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
      </Typography>
      <Box mb="36px" display="flex" alignItems="center" justifyContent="center" mt="36px">
        <HubmeekIcon />
      </Box>
      <Box mt="36px">
        <Typography sx={{ color: theme.palette.case.neutral.n700 }} variant="body">
          <Trans i18nKey="onboarding.trialStep.subtitle" values={{ amount: selectedPlan.amount / 100 }}>
            <Typography variant="bodyBold" />
          </Trans>
        </Typography>
      </Box>
    </Box>
  );
};

export default TrialStep;
