import { Box, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { planToolsConfig } from '../../../../shared/configs/onboarding/planTools.config';
import { PlansPricingItemEnum } from '../../../../shared/enums/plansPricingItem.enum';
import { PlanModel } from '../../../../shared/models/plans.model';
import {
  OnboardingPlanContainer,
  OnboardingPlanFooter,
  UserChooseContainer,
} from './OnboardingPlanItem.styled';
import { PlanPeriodEnum } from '../../../../shared/enums/planPeriodEnum';

type Props = {
  recommended: boolean;
  isMiddle: boolean;
  planItem: PlanModel;
  onClick: () => void;
  isShowUserChouse?: boolean;
  period?: PlanPeriodEnum;
};

const OnboardingPlanItem: FC<Props> = ({
  recommended,
  isMiddle,
  planItem,
  onClick,
  isShowUserChouse = true,
}) => {
  const footerLabel = useMemo(() => {
    if (planItem.tag === PlansPricingItemEnum.starter) {
      return 'Just for now';
    }
    if (planItem.tag === PlansPricingItemEnum.basic) {
      return `Let's do it`;
    }
    return 'Need a Pro';
  }, [planItem.tag]);
  const price = useMemo(() => {
    return `$${planItem.amount / 100}/${planItem.period === PlanPeriodEnum.month ? 'month' : 'year'}`;
  }, [planItem]);

  return (
    <OnboardingPlanContainer onClick={onClick} isMiddle={isMiddle} recommended={recommended}>
      {isShowUserChouse && planItem.tag === PlansPricingItemEnum.basic && (
        <UserChooseContainer>
          <Typography noWrap variant="small_bolt">
            User&apos;s Choise
          </Typography>
        </UserChooseContainer>
      )}
      <Box p="12px 0px" flexGrow={1} display="flex" flexDirection="column" alignItems="center">
        <Box>
          <Typography sx={{ color: (theme) => theme.palette.case.neutral.n900 }} variant="h2">
            {planItem.name}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ color: (theme) => theme.palette.case.primary.p600 }} variant="h3">
            {price}
          </Typography>
        </Box>

        <Box mt="4px">
          {planToolsConfig[planItem.tag].map((item, index) => (
            <Box display="flex" alignItems="center" key={index}>
              <Box mr="4px">
                <DoneIcon sx={{ color: (theme) => theme.palette.case.neutral.n500 }} />
              </Box>
              <Typography sx={{ color: (theme) => theme.palette.case.neutral.n700 }} variant="default">
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <OnboardingPlanFooter>
        <Typography variant="default_bolt">{footerLabel}</Typography>
      </OnboardingPlanFooter>
    </OnboardingPlanContainer>
  );
};

export default OnboardingPlanItem;
