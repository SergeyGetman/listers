import React, { FC } from 'react';
import { Box, Radio, RadioGroup, Typography, useTheme } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { RecurringTypeConfig } from '../../../../../shared/configs/selectors/recurringType.config';
import { RecurringTypeEnum } from '../../../../../shared/enums/recurringType.enum';
type CustomRecurringHeaderProps = {
  control: Control<any>;
};
const CustomRecurringHeader: FC<CustomRecurringHeaderProps> = ({ control }) => {
  const theme = useTheme();

  const recurringTypeOptions = [
    RecurringTypeConfig[RecurringTypeEnum.DAILY],
    RecurringTypeConfig[RecurringTypeEnum.WEEKLY],
    RecurringTypeConfig[RecurringTypeEnum.MONTHLY],
  ];

  return (
    <Box sx={{ pb: '5px', borderBottom: `1px solid ${theme.palette.case.neutral.n200}` }}>
      <Controller
        name="recurring_pattern.recurring_type"
        control={control}
        render={({ field }) => (
          <RadioGroup
            {...field}
            sx={{ display: 'flex', width: '100%', flexDirection: 'row' }}
            aria-label="quiz"
          >
            {recurringTypeOptions.map((item, index) => (
              <Radio
                key={index}
                sx={{ borderRadius: '0', mr: '55px' }}
                value={item.value}
                color="primary"
                disableRipple
                checkedIcon={<Typography variant="default_bolt"> {item.label}</Typography>}
                icon={
                  <Typography sx={{ color: theme.palette.case.neutral.n700 }} variant="default_bolt">
                    {item.label}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
        )}
      />
    </Box>
  );
};

export default CustomRecurringHeader;
