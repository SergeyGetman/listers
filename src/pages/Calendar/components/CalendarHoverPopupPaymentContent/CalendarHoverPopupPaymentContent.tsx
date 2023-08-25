import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';
import Moment from 'moment/moment';
import {
  CalendarHoverPopupTaskContentHeader,
  CalendarHoverPopupTaskContentHeaderTitle,
} from '../CalendarHoverPopupTaskContent/CalendarHoverPopupTaskContent.style';
import { ReactComponent as PaymentIcon } from '../../../../assets/Images/payment.svg';
import MuiBaseInputView from '../../../../components/formElements/MuiBaseInputView';
import { getCurrencyValue } from '../../../../shared/utils/getCurrencyValue';
type CalendarHoverPopupPaymentContentProps = {
  item: any;
};
const CalendarHoverPopupPaymentContent: FC<CalendarHoverPopupPaymentContentProps> = ({ item }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Box>
      <CalendarHoverPopupTaskContentHeader color={item.color}>
        <CalendarHoverPopupTaskContentHeaderTitle>
          <PaymentIcon />
          <Typography noWrap sx={{ color: theme.palette.case.contrast.white }} variant="small">
            {item.title}
          </Typography>
        </CalendarHoverPopupTaskContentHeaderTitle>
      </CalendarHoverPopupTaskContentHeader>
      <Box
        sx={{
          width: '100%',
          mt: '16px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          color: theme.palette.case.contrast.black,
        }}
      >
        <Box sx={{ width: '50%' }}>
          <MuiBaseInputView
            label={t('general.fieldNames.dueDate')}
            content={
              item.due_dated_at
                ? Moment.utc(item.due_dated_at, 'YYYY-MM-DD HH:mm:ss').local().format('MM/DD/YYYY')
                : 'N/A'
            }
          />
        </Box>

        <Box sx={{ width: '48%', ml: '16px' }}>
          <MuiBaseInputView label={t('general.fieldNames.amount')} content={getCurrencyValue(item?.amount)} />
        </Box>
      </Box>
      <Box sx={{ color: theme.palette.case.contrast.black, mt: '16px' }}>
        <MuiBaseInputView
          isShowBottomBorder={false}
          content={item?.description ? parse(item.description) : 'N/A'}
          label={t('general.fieldNames.description')}
        />
      </Box>
    </Box>
  );
};

export default CalendarHoverPopupPaymentContent;
