import { lazy, memo } from 'react';
import { componentLoader } from '../../../utils/componentLoader';

const Garage = memo(lazy(() => componentLoader(() => import('../../../../pages/Garage'))));
const GarageOpenItem = memo(
  lazy(() => componentLoader(() => import('../../../../pages/Garage/components/GarageOpenItem'))),
);

const garageRoute = {
  path: '/garage',
  component: <Garage />,
  index: true,
  children: {
    component: <GarageOpenItem />,
  },
};
export default garageRoute;
