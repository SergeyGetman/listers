import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import MuiButton from '../../../../../../components/buttons/MuiButton';
import { PlansItemContainer, PlansLabel } from './PlansItem.style';
import { PlanPeriodEnum } from '../../../../../../shared/enums/planPeriodEnum';

type PlansPricingCardProps = {
  label?: string;
  title: string;
  costFree?: string;
  costPeriodMonth?: string;
  costPeriodYear?: string;
  subtitle: string;
  planListTitle: string;
  planListItems: { listItem: string }[];
  period: PlanPeriodEnum;
  amount: number;
  isCurrent: boolean;
  onUpgrade: () => void;
};
const PlansItem: FC<PlansPricingCardProps> = ({
  label,
  title,
  costFree,
  costPeriodMonth,
  costPeriodYear,
  subtitle,
  planListTitle,
  planListItems,
  period,
  amount,
  isCurrent,
  onUpgrade,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <PlansItemContainer>
      <PlansLabel variant="default_bolt">{label}</PlansLabel>
      <Box sx={{ height: '114px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h2" sx={{ textTransform: 'capitalize' }}>
          {title}
        </Typography>
        <Typography variant="h2">{costFree}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h2">
            {amount !== 0 ? `$${period === PlanPeriodEnum.month ? amount / 100 : amount / 100 / 12}` : ''}
          </Typography>

          <Typography variant="large" sx={{ ml: '5px' }}>
            {costPeriodMonth}
          </Typography>
        </Box>
        {amount !== 0 ? (
          period === PlanPeriodEnum.year ? (
            <>
              <Typography variant="large">${amount / 100}</Typography>
              <Typography variant="large" sx={{ ml: '5px' }}>
                {costPeriodYear}
              </Typography>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="large">${(amount * 12) / 100}</Typography>
              <Typography variant="large" sx={{ ml: '5px' }}>
                {costPeriodYear}
              </Typography>
            </Box>
          )
        ) : (
          <></>
        )}
      </Box>
      <Typography
        variant="default"
        sx={{ color: theme.palette.case.neutral.n500, mt: '16px', textAlign: 'center' }}
      >
        {subtitle}
      </Typography>
      <MuiButton
        onClick={onUpgrade}
        label={isCurrent ? t('general.buttons.current') : t('general.buttons.choose')}
        isDisabled={isCurrent}
        size="medium"
        variant="contained"
        sx={{ mt: '30px', mb: '30px' }}
      />
      <Typography variant="large" sx={{ padding: '0 10px' }}>
        {planListTitle}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: '0 0 0 10px' }}>
        {planListItems.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: '16px' }}>
            <CheckIcon fontSize="small" sx={{ mr: '20px', fill: theme.palette.primary.main }} />
            <Typography variant="default" sx={{ display: 'flex', alignItems: 'center' }}>
              {item.listItem}
            </Typography>
          </Box>
        ))}
      </Box>
    </PlansItemContainer>
  );
};

export default PlansItem;
