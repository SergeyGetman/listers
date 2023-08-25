import { lazy, memo } from 'react';
import { componentLoader } from '../../../utils/componentLoader';

const Network = memo(lazy(() => componentLoader(() => import('../../../../pages/Network'))));
const garageRoute = {
  path: '/network',
  component: <Network />,
  index: true,
};
export default garageRoute;
