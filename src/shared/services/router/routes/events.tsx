import { lazy, memo } from 'react';
import { componentLoader } from '../../../utils/componentLoader';

const Events = memo(lazy(() => componentLoader(() => import('../../../../pages/Events'))));
const eventsRoute = {
  path: '/events',
  component: <Events />,
  index: true,
};
export default eventsRoute;
