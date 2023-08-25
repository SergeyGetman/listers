import React, { FC } from 'react';
import Moment from 'moment';
import { useTheme } from '@mui/material';
type EventLabelProps = {
  data: any;
};
const EventLabel: FC<EventLabelProps> = ({ data }) => {
  const theme = useTheme();
  return data.isMultiDay || data.original.allDay ? (
    <div
      style={{
        backgroundColor: data.original.color,
      }}
      className="multi-day-event"
    >
      <div
        style={{
          backgroundImage: data.original.userNotification
            ? `repeating-linear-gradient(-45deg, ${theme.palette.case.contrast.gray1}4D, ${theme.palette.case.contrast.gray1}4D 4px, ${data.original.color}4D 4px, ${data.original.color}4D 14px )`
            : 'initial',
        }}
      >
        {data.original.title}
      </div>
    </div>
  ) : (
    <div className="custom-single-day-item">
      <div className="single-day-event-dot" style={{ background: data.original.color }} />
      <div className="single-day-event" style={{ color: theme.palette.case.contrast.black }}>
        {data.original.title}
      </div>
      <div className="single-day-event-time">{Moment(data.original.start).format('hh:mm A')}</div>
    </div>
  );
};

export default EventLabel;
