import { lazy, memo } from 'react';
import { componentLoader } from '../../../utils/componentLoader';

const Organizers = memo(lazy(() => componentLoader(() => import('../../../../pages/Organizer'))));

const organizerRoute = {
  path: '/organizer',
  component: <Organizers />,
  index: true,
};

export default organizerRoute;
