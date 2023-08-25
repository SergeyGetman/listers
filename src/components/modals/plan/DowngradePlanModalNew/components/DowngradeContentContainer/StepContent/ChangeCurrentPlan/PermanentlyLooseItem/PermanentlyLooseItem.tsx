import React, { FC, ReactElement, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import DoneIcon from '@mui/icons-material/Done';
import { useAppSelector } from '../../../../../../../../../shared/hooks/redux';
import { RootState } from '../../../../../../../../../store/store';
import { ReactComponent as CrownGoldIcon } from '../../../../../../../../../assets/Images/сrown-gold-package.svg';
import { ReactComponent as CrownPlatinumIcon } from '../../../../../../../../../assets/Images/crown-platinum-package.svg';
import {
  content_wrapper,
  LooseItem,
  LooseItemBlock,
  looseItemSubscriptionTitle,
} from './PermanentlyLooseItem.style';
import { PlanNamePackage } from '../../../../../../../../../shared/enums/planPeriodEnum';

type PropsType = {
  downgradeName: string;
};

const subIcon: { [key: string]: ReactElement } = {
  Gold: <CrownGoldIcon />,
  Platinum: <CrownPlatinumIcon />,
};

const getCurrentSubscription = (state: RootState) => state.profile.data.subscription.name;

const getLooseHubs = (currentSub: string, downgradeName: string) => {
  if (currentSub === PlanNamePackage.Gold && downgradeName === PlanNamePackage.Silver) {
    return ['Auto reminders', 'Tasks and events full access', 'Prioritizing', 'Due dates'];
  }
  if (currentSub === PlanNamePackage.Platinum && downgradeName === PlanNamePackage.Silver) {
    return [
      'Auto-scheduled payments',
      'Hubs full access',
      'Auto reminders',
      'Tasks and events full access',
      'Prioritizing',
      'Due dates',
      'Progress tracking',
    ];
  }
  if (currentSub === PlanNamePackage.Platinum && downgradeName === PlanNamePackage.Gold) {
    return ['Auto-scheduled payments', 'Hubs full access', 'Auto reminders from Garage Hub'];
  }
  return [];
};

const PermanentlyLooseItem: FC<PropsType> = ({ downgradeName }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentNameSubscription = useAppSelector(getCurrentSubscription);

  const [looseHubs] = useState(() => getLooseHubs(currentNameSubscription, downgradeName));

  return (
    <LooseItemBlock isMobile={isMobile}>
      <Box sx={content_wrapper}>
        <Box sx={looseItemSubscriptionTitle}>
          {subIcon[currentNameSubscription]}
          <Typography variant="h1" sx={{ color: theme.palette.case.neutral.n900 }}>
            {currentNameSubscription}
          </Typography>
        </Box>
        {looseHubs?.map((el, index) => (
          <LooseItem key={index}>
            <DoneIcon sx={{ color: theme.palette.case.neutral.n500 }} />
            <Typography
              variant="subheader3"
              sx={{ color: theme.palette.case.neutral.n700, textAlign: 'start' }}
            >
              {el}
            </Typography>
          </LooseItem>
        ))}
      </Box>
    </LooseItemBlock>
  );
};

export default PermanentlyLooseItem;
