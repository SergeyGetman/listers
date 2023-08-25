import { lazy, memo } from 'react';
import { componentLoader } from '../../../utils/componentLoader';

const Chat = memo(lazy(() => componentLoader(() => import('../../../../pages/Chat'))));
const chatRoute = {
  path: '/chat',
  component: <Chat />,
  index: true,
  children: {
    private: {
      path: 'personal',
    },
    group: {
      path: 'group',
    },
  },
};
export default chatRoute;
