import { lazy, memo } from 'react';
import { componentLoader } from '../../../utils/componentLoader';

const Calendar = memo(lazy(() => componentLoader(() => import('../../../../pages/Calendar'))));

const calendarRoute = {
  path: '/calendar',
  component: <Calendar />,
  index: true,
};

export default calendarRoute;
