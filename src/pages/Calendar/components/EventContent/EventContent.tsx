import React, { FC } from 'react';
import Moment from 'moment';
import { useTheme } from '@mui/material';
type EventContentProps = {
  data: any;
};
const EventContent: FC<EventContentProps> = ({ data }) => {
  const theme = useTheme();

  return (
    <div className="custom-single-day-item">
      <div className="header-container">
        <div className="single-day-event-dot" style={{ background: data.original.color }} />

        <div
          className="single-day-event"
          style={{
            color: theme.palette.case.contrast.black,
          }}
        >
          {data.original.title}
        </div>
      </div>

      <div className="single-day-event-time">
        {data.allDay
          ? 'All-day'
          : `${Moment(data.original.start).format('hh:mm A')} - ${Moment(data.original.end).format(
              'hh:mm A',
            )}`}
      </div>
    </div>
  );
};

export default EventContent;
