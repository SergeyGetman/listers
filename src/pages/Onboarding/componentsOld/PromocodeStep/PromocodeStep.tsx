import { Box, Typography, useTheme } from '@mui/material';
import React, { FC, useMemo } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import MuiButton from '../../../../components/buttons/MuiButton';
import OnboardingChip from '../OnboardingChip';

import OnboardingLayout from '../OnboardingLayout';
import { getToolsLeftConfig, getToolsRightConfig } from '../../../../shared/configs/onboarding/tools.config';
import { PlanModel } from '../../../../shared/models/plans.model';
import { PlanPeriodEnum } from '../../../../shared/enums/planPeriodEnum';
import { ToolsEnum } from '../../../../shared/enums/onboarding/tools.enum';

type Props = {
  handleUsePromocode: () => void;
  handleCancelPromocode: () => void;
  selectedTools: ToolsEnum[];
  isFullWidth?: boolean;
  isBackCancelPromocode?: boolean;
  selectedPlan: PlanModel;
  period: PlanPeriodEnum;
};

const PromocodeStep: FC<Props> = ({
  handleUsePromocode,
  handleCancelPromocode,
  isBackCancelPromocode,
  selectedTools,
  isFullWidth,
  selectedPlan,
  period,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const toolsArray = [...getToolsLeftConfig(t), ...getToolsRightConfig(t)];
  const list = useMemo(() => {
    return selectedTools.filter((item) => item !== ToolsEnum.checklists && item !== ToolsEnum.notes);
  }, [selectedTools]);

  return (
    <OnboardingLayout
      step={7}
      isShowStep={false}
      totalSteps={0}
      minHeight={600}
      isFullWidth={isFullWidth}
      leftBtnProps={{
        isShow: !!isBackCancelPromocode,
        label: 'Back',
        onClick: handleCancelPromocode,
        startIcon: <ArrowBackIcon />,
      }}
      rightBtnProps={{
        isShow: !isBackCancelPromocode,
        label: 'Cancel',
        onClick: handleCancelPromocode,
      }}
    >
      <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="space-between">
        <Box>
          {isBackCancelPromocode ? (
            <Typography
              lineHeight="30px"
              sx={{
                color: theme.palette.case.neutral.n900,
              }}
              variant="subtitle1"
              component="span"
            >
              Looks like we will have limited abilities in using{' '}
              {list.map((item, index) => {
                return (
                  <>
                    {' '}
                    <OnboardingChip key={index} color={theme.palette.case.blue.b100}>
                      {toolsArray.find((el) => el.key === item)?.label}
                    </OnboardingChip>{' '}
                  </>
                );
              })}{' '}
              with Silver plan.
            </Typography>
          ) : (
            <Typography
              lineHeight="30px"
              sx={{
                color: theme.palette.case.neutral.n900,
              }}
              variant="subtitle1"
              component="span"
            >
              You can use{' '}
              {list.map((item, index) => {
                return (
                  <>
                    {' '}
                    <OnboardingChip key={index} color={theme.palette.case.blue.b100}>
                      {toolsArray.find((el) => el.key === item)?.label}
                    </OnboardingChip>{' '}
                  </>
                );
              })}{' '}
              only with {selectedPlan.name} plan.
            </Typography>
          )}
        </Box>
        <Box>
          <Box mb="24px">
            <Typography variant="subtitle1" fontWeight={700} sx={{ color: theme.palette.case.neutral.n800 }}>
              So, here&apos;s a present to better manage your needs, because we care:
            </Typography>
          </Box>
          <Box p="24px" sx={{ background: theme.palette.case.neutral.n75, borderRadius: '8px' }}>
            <Typography sx={{ color: theme.palette.case.neutral.n900 }} variant="large" component="span">
              <Typography variant="h2" component="span">
                Get{' '}
                <Typography sx={{ color: theme.palette.error.main }} variant="h2" component="span">
                  -50%
                </Typography>{' '}
                promo code — “newmee”
              </Typography>
              <br />
              for the {isBackCancelPromocode ? 'Platinum' : selectedPlan.name} plan
            </Typography>
            <Box mt="16px" display="flex" justifyContent="center">
              <MuiButton variant="contained" label="Use promo code" onClick={handleUsePromocode} />
            </Box>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              minWidth: 36,
              minHeight: 36,
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: theme.palette.case.neutral.n200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <InfoOutlinedIcon sx={{ color: theme.palette.case.neutral.n600 }} />
          </Box>
          <Box ml="12px">
            <Typography variant="large">
              This discount is valid only for the first {period === PlanPeriodEnum.month ? 'month' : 'year'}
              &apos;s purchase
            </Typography>
          </Box>
        </Box>
      </Box>
    </OnboardingLayout>
  );
};

export default PromocodeStep;
