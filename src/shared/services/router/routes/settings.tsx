import { lazy, memo } from 'react';
import { componentLoader } from '../../../utils/componentLoader';

const Settings = memo(lazy(() => componentLoader(() => import('../../../../pages/Settings'))));
const GeneralSettings = memo(
  lazy(() => componentLoader(() => import('../../../../pages/Settings/components/GeneralSettings'))),
);
const Plans = memo(lazy(() => componentLoader(() => import('../../../../pages/Settings/components/Plans'))));
const Wallet = memo(
  lazy(() => componentLoader(() => import('../../../../pages/Settings/components/Wallet'))),
);
const Archive = memo(
  lazy(() => componentLoader(() => import('../../../../pages/Settings/components/Archive'))),
);

const Hubs = memo(lazy(() => componentLoader(() => import('../../../../pages/Settings/components/Hubs'))));
const Logout = memo(lazy(() => componentLoader(() => import('../../../../pages/Logout'))));

const settingsRoute = {
  path: '/settings',
  component: <Settings />,
  index: true,
  children: {
    generalSettings: {
      path: ``,
      component: <GeneralSettings />,
    },
    plans: {
      path: `plans`,
      component: <Plans />,
    },
    wallet: {
      path: `wallet`,
      component: <Wallet />,
    },
    archive: {
      path: `archive`,
      component: <Archive />,
    },
    hubs: {
      path: `hubs`,
      component: <Hubs />,
    },
    logout: {
      path: 'logout',
      component: <Logout />,
    },
  },
};
export default settingsRoute;
