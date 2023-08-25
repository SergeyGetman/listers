import { lazy, memo } from 'react';
import { componentLoader } from '../../../utils/componentLoader';

const Backlog = memo(lazy(() => componentLoader(() => import('../../../../pages/Backlog'))));
const backlogRoute = {
  path: '/backlog',
  component: <Backlog />,
  index: true,
};
export default backlogRoute;
