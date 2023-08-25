import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Moment } from 'moment';
import ButtonDatepicker from '../../../../../../formElements/ButtonDatepicker';

type DailyRecurringBlockProps = {
  recurringEndDate?: Moment | null;
  handleChangeRecurringEndDate?: (val: Moment | null) => void;
};
const DailyRecurringBlock: FC<DailyRecurringBlockProps> = ({
  recurringEndDate,
  handleChangeRecurringEndDate,
}) => {
  return (
    <Box mt="10px">
      <ButtonDatepicker onChange={handleChangeRecurringEndDate} value={recurringEndDate} />
    </Box>
  );
};

export default DailyRecurringBlock;
