import { lazy, memo } from 'react';
import { componentLoader } from '../../../utils/componentLoader';

const Profile = memo(lazy(() => componentLoader(() => import('../../../../pages/Profile'))));
const profileRoute = {
  path: '/profile',
  component: <Profile />,
  index: true,
};
export default profileRoute;
