import { Box } from '@mui/material';
import moment from 'moment';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { OnboardingModel } from '../../../../../shared/models/onboarding.model';
import GeneralDatepicker from '../../../../../components/formElements/GeneralDatepicker';
import { DatePickerOnChangeModel } from '../../../../../shared/models/datePickerOnChange.model';

type Props = {
  handleSetStore: (value: string[]) => void;
  initData: OnboardingModel['birthday'];
};
const BirthdayStep: FC<Props> = ({ handleSetStore, initData: [birthdayData] }) => {
  const { t } = useTranslation();

  const dateValue = moment(birthdayData).isValid()
    ? moment(birthdayData, 'MM/DD/YYYY').format('DD/MM/YYYY')
    : undefined;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" flexGrow={1}>
      <Box width="100%" maxWidth={230}>
        <GeneralDatepicker
          value={dateValue}
          isFullWidth={false}
          placeholder={t('general.placeholders.select_date')}
          label={t('general.fieldNames.dateOfBirth')}
          max={moment().subtract(2, 'days').subtract(13, 'years').toDate()}
          min={moment().subtract(100, 'years').toDate()}
          onChange={(date: DatePickerOnChangeModel) => {
            handleSetStore([moment(date.valueText, 'DD/MM/YYYY').format('MM/DD/YYYY')]);
          }}
        />
      </Box>
    </Box>
  );
};

export default BirthdayStep;
