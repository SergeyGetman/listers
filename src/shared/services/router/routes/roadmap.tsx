import { lazy, memo } from 'react';
import { componentLoader } from '../../../utils/componentLoader';

const Roadmap = memo(lazy(() => componentLoader(() => import('../../../../pages/Roadmap'))));
const roadmapRoute = {
  path: '/tasks',
  component: <Roadmap />,
  index: true,
};
export default roadmapRoute;
