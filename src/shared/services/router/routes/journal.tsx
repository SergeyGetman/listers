import { lazy, memo } from 'react';
import { componentLoader } from '../../../utils/componentLoader';

const PlannerList = memo(lazy(() => componentLoader(() => import('../../../../pages/PlannerList'))));

const journalRoute = {
  path: '/journal',
  component: <PlannerList />,
  index: true,
};

export default journalRoute;
