import { lazy, memo } from 'react';
import { componentLoader } from '../../../utils/componentLoader';

const Network = memo(lazy(() => componentLoader(() => import('../../../../pages/NewNetwork'))));
const Contacts = memo(
  lazy(() => componentLoader(() => import('../../../../pages/NewNetwork/pages/Contacts'))),
);
const Connections = memo(
  lazy(() => componentLoader(() => import('../../../../pages/NewNetwork/pages/Connections/Connections'))),
);
const networkNewRoute = {
  path: '/networkNew',
  component: <Network />,
  index: true,
  children: {
    connections: {
      path: ``,
      component: <Connections />,
    },
    contacts: {
      path: `contacts`,
      component: <Contacts />,
    },
  },
};
export default networkNewRoute;
