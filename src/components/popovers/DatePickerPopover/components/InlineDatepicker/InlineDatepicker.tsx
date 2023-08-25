import React, { FC } from 'react';
import * as moment from 'moment';
import { Datepicker } from '@mobiscroll/react';
import { Moment } from 'moment';
import { InlineDatepickerContainer } from './InlineDatepicker.style';
import InlineDatePickerHeader from './components/InlineDatePickerHeader';
type InlineDatepickerProps = {
  handleChangeData: (e: { value: Moment | null }) => void;
  handleChangeRangeData: (e: [Moment | null | undefined, Moment | null | undefined]) => void;
  isRange?: boolean;
  value?: Moment | null | [Moment | null | undefined, Moment | null | undefined];
};
const InlineDatepicker: FC<InlineDatepickerProps> = ({
  handleChangeData,
  handleChangeRangeData,
  isRange,
  value,
}) => {
  return (
    <InlineDatepickerContainer>
      <Datepicker
        showRangeLabels={false}
        onChange={(e) =>
          isRange ? handleChangeRangeData(e.value) : e?.value?.isValid() ? handleChangeData(e) : true
        }
        renderCalendarHeader={InlineDatePickerHeader}
        themeVariant="light"
        value={value}
        moment={moment}
        returnFormat="moment"
        select={isRange ? 'range' : 'date'}
        controls={['calendar']}
        display="inline"
        touchUi={false}
        dayNamesMin={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
      />
    </InlineDatepickerContainer>
  );
};

export default InlineDatepicker;
