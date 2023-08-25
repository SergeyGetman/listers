import { lazy, memo } from 'react';
import { componentLoader } from '../../../utils/componentLoader';

const Feedback = memo(lazy(() => componentLoader(() => import('../../../../pages/Feedback'))));

const feedbackRoute = {
  path: '/feedback',
  component: <Feedback />,
  index: true,
};
export default feedbackRoute;
