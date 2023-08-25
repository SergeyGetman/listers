import React, { FC } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PlanPeriodEnum } from '../../../../../../shared/enums/planPeriodEnum';
import {
  PlanItemCardButton,
  PlanItemCardContainer,
  PlanItemCardContent,
  PlanItemCrownIconContainer,
} from './PlanItemCard.styled';

type Props = {
  isFree?: boolean;
  firstPrice?: {
    price: string;
    period: string;
  };
  buttonLabel: string;
  title?: string;

  cardHeight: string;
  description?: string;
  onClick: () => void;
  isCurrent: boolean;
  list: string[];
  amount: number;
  period: string;
  CrownIcon: any;
  month_amount: number;
};

const PlanItemCard: FC<Props> = ({
  isFree = false,
  firstPrice,
  title,
  description,
  cardHeight,
  onClick,
  isCurrent,
  amount,
  period,
  list,
  month_amount,
  buttonLabel = 'Upgrade',
  CrownIcon,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <PlanItemCardContainer onClick={onClick} isCurrent={isCurrent} cardHeight={cardHeight}>
      <PlanItemCardContent>
        <Typography className="sub-title" variant="bodySmall">
          {description}
        </Typography>
        {CrownIcon && (
          <PlanItemCrownIconContainer>
            <CrownIcon />
          </PlanItemCrownIconContainer>
        )}
        {title && (
          <Typography className="white-color" component="span" variant="h1">
            {title}
          </Typography>
        )}
        {firstPrice && (
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Typography className="green-color" sx={{ color: theme.palette.case.primary.p500 }} variant="h3">
              {`${firstPrice.price}`}
            </Typography>
            <Typography className="green-color" variant="large">
              {firstPrice.period}
            </Typography>
          </Box>
        )}
        {amount !== 0 && (
          <Box>
            {period === PlanPeriodEnum.month ? (
              <Typography
                sx={{
                  color: theme.palette.case.neutral.n500,
                }}
                variant="default"
              >
                ${`${amount / 30 / 100}`.slice(0, 4)}/${t('general.period.day')}
              </Typography>
            ) : (
              <Typography
                sx={{
                  color: theme.palette.case.neutral.n500,
                  textDecoration: 'line-through',
                }}
                variant="default"
              >
                ${(month_amount * 12) / 100}/${t('general.period.year')}
              </Typography>
            )}
          </Box>
        )}
        {isFree && (
          <Typography className="green-color" variant="h3">
            Free-forever
          </Typography>
        )}
      </PlanItemCardContent>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {list.map((item: string) => (
          <Box
            sx={{
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
            key={item}
          >
            <CheckIcon sx={{ color: theme.palette.case.neutral.n500, width: '20px', marginRight: '4px' }} />
            <Typography
              sx={{ color: theme.palette.case.neutral.n700 }}
              className="white-color-text"
              variant="large"
            >
              {item}
            </Typography>
          </Box>
        ))}
      </Box>
      <PlanItemCardButton className="button">
        <Typography className="white-color-btn" component="span" variant="default">
          {buttonLabel}
        </Typography>
      </PlanItemCardButton>
    </PlanItemCardContainer>
  );
};

export default PlanItemCard;
