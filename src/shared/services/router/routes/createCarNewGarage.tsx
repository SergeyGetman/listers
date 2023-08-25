import { lazy, memo } from 'react';
import { componentLoader } from '../../../utils/componentLoader';

const CreateNewCar = memo(
  lazy(() =>
    componentLoader(
      () => import('../../../../pages/GarageNew/components/GarageCreateNewCar/GarageCreateNewCar'),
    ),
  ),
);
const GarageOpenItem = memo(
  lazy(() => componentLoader(() => import('../../../../pages/Garage/components/GarageOpenItem'))),
);

const garageNewRoute = {
  path: '/create-car',
  component: <CreateNewCar />,
  index: true,
  children: {
    component: <GarageOpenItem />,
  },
};
export default garageNewRoute;
